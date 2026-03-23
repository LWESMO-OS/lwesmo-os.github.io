const LWESMOU_CORE = (function() {
    'use strict';

    const UI_STATE = {
        isSidebarOpen: false,
        isModalOpen: false,
        lastScrollPos: 0,
        isLoading: true,
        activeTheme: 'matte-black',
        particlesEnabled: true
    };

    const DOM_ELEMENTS = {
        body: document.body,
        header: document.getElementById('site-header'),
        preloader: document.getElementById('preloader'),
        loadBar: document.getElementById('loadBar'),
        sidebar: document.getElementById('main-sidebar'),
        sidebarToggle: document.getElementById('sidebarToggle'),
        sidebarClose: document.getElementById('sidebarCloseBtn'),
        neonCanvas: document.getElementById('neonCanvas'),
        privacyModal: document.getElementById('privacy-overlay'),
        privacyOpen: document.getElementById('privacyOpenBtn'),
        privacyClose: document.getElementById('privacyCloseBtn'),
        privacyAccept: document.getElementById('privacyAcceptBtn'),
        backToTop: document.getElementById('backToTop'),
        faqItems: document.querySelectorAll('.faq-item-v3')
    };

    class Particle {
        constructor(canvasWidth, canvasHeight) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.init();
        }

        init() {
            this.x = Math.random() * this.canvasWidth;
            this.y = Math.random() * this.canvasHeight;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1.5 - 0.75;
            this.speedY = Math.random() * 1.5 - 0.75;
            this.color = '#ff6600';
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > this.canvasWidth) this.x = 0;
            else if (this.x < 0) this.x = this.canvasWidth;
            
            if (this.y > this.canvasHeight) this.y = 0;
            else if (this.y < 0) this.y = this.canvasHeight;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 102, 0, ${this.opacity})`;
            ctx.fill();
        }
    }

    class NeonBackground {
        constructor(canvasId) {
            this.canvas = canvasId;
            if (!this.canvas) return;
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.numberOfParticles = 80;
            this.resize();
            this.createParticles();
            this.animate();
            window.addEventListener('resize', () => this.resize());
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        createParticles() {
            for (let i = 0; i < this.numberOfParticles; i++) {
                this.particles.push(new Particle(this.canvas.width, this.canvas.height));
            }
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.particles.forEach(particle => {
                particle.update();
                particle.draw(this.ctx);
            });
            this.connectParticles();
            requestAnimationFrame(() => this.animate());
        }

        connectParticles() {
            const maxDistance = 150;
            for (let a = 0; a < this.particles.length; a++) {
                for (let b = a; b < this.particles.length; b++) {
                    const dx = this.particles[a].x - this.particles[b].x;
                    const dy = this.particles[a].y - this.particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = 1 - (distance / maxDistance);
                        this.ctx.strokeStyle = `rgba(255, 102, 0, ${opacity * 0.2})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
                        this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
                        this.ctx.stroke();
                    }
                }
            }
        }
    }

    const AnimationEngine = {
        initLoader() {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    this.hideLoader();
                }
                if (DOM_ELEMENTS.loadBar) {
                    DOM_ELEMENTS.loadBar.style.width = progress + '%';
                }
            }, 150);
        },

        hideLoader() {
            if (DOM_ELEMENTS.preloader) {
                DOM_ELEMENTS.preloader.style.opacity = '0';
                setTimeout(() => {
                    DOM_ELEMENTS.preloader.style.display = 'none';
                    UI_STATE.isLoading = false;
                    this.revealContent();
                }, 600);
            }
        },

        revealContent() {
            const revealItems = document.querySelectorAll('.animate-pop, .vision-card-premium, .tool-item-large');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            revealItems.forEach(item => observer.observe(item));
        }
    };

    const NavigationManager = {
        toggleSidebar() {
            UI_STATE.isSidebarOpen = !UI_STATE.isSidebarOpen;
            if (UI_STATE.isSidebarOpen) {
                DOM_ELEMENTS.sidebar.classList.add('sidebar-open');
                DOM_ELEMENTS.sidebar.classList.remove('sidebar-closed');
                DOM_ELEMENTS.body.style.overflow = 'hidden';
            } else {
                DOM_ELEMENTS.sidebar.classList.remove('sidebar-open');
                DOM_ELEMENTS.sidebar.classList.add('sidebar-closed');
                DOM_ELEMENTS.body.style.overflow = 'auto';
            }
        },

        handleScroll() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                DOM_ELEMENTS.header.classList.add('header-scrolled');
                DOM_ELEMENTS.backToTop.classList.add('show');
            } else {
                DOM_ELEMENTS.header.classList.remove('header-scrolled');
                DOM_ELEMENTS.backToTop.classList.remove('show');
            }

            if (currentScroll > UI_STATE.lastScrollPos && currentScroll > 200) {
                DOM_ELEMENTS.header.style.transform = 'translateY(-100%)';
            } else {
                DOM_ELEMENTS.header.style.transform = 'translateY(0)';
            }
            
            UI_STATE.lastScrollPos = currentScroll;
            this.updateActiveLink();
        },

        updateActiveLink() {
            const sections = document.querySelectorAll('section');
            const navItems = document.querySelectorAll('.nav-item');
            
            let currentActive = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= (sectionTop - 150)) {
                    currentActive = section.getAttribute('id');
                }
            });

            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(currentActive)) {
                    link.classList.add('active');
                }
            });
        }
    };
       const ModalManager = {
        openPrivacyModal(e) {
            if (e) e.preventDefault();
            UI_STATE.isModalOpen = true;
            DOM_ELEMENTS.privacyModal.style.display = 'flex';
            DOM_ELEMENTS.body.style.overflow = 'hidden';
            setTimeout(() => {
                DOM_ELEMENTS.privacyModal.classList.add('modal-visible');
            }, 10);
        },

        closePrivacyModal() {
            UI_STATE.isModalOpen = false;
            DOM_ELEMENTS.privacyModal.classList.remove('modal-visible');
            setTimeout(() => {
                DOM_ELEMENTS.privacyModal.style.display = 'none';
                if (!UI_STATE.isSidebarOpen) {
                    DOM_ELEMENTS.body.style.overflow = 'auto';
                }
            }, 400);
        },

        handleOverlayClick(e) {
            if (e.target === DOM_ELEMENTS.privacyModal) {
                this.closePrivacyModal();
            }
        }
    };

    const InteractionEngine = {
        initFaq() {
            DOM_ELEMENTS.faqItems.forEach(item => {
                const header = item.querySelector('.faq-header-v3');
                header.addEventListener('click', () => {
                    const isOpen = item.classList.contains('faq-open');
                    this.closeAllFaq();
                    if (!isOpen) {
                        item.classList.add('faq-open');
                        const icon = item.querySelector('i');
                        icon.style.transform = 'rotate(180deg)';
                    }
                });
            });
        },

        closeAllFaq() {
            DOM_ELEMENTS.faqItems.forEach(item => {
                item.classList.remove('faq-open');
                const icon = item.querySelector('i');
                if (icon) icon.style.transform = 'rotate(0deg)';
            });
        },

        initSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        if (UI_STATE.isSidebarOpen) {
                            NavigationManager.toggleSidebar();
                        }

                        const headerOffset = 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        },

        initBackToTop() {
            DOM_ELEMENTS.backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    const ToolModule = {
        initToolHover() {
            const tools = document.querySelectorAll('.tool-item-large');
            tools.forEach(tool => {
                tool.addEventListener('mouseenter', () => {
                    tool.querySelector('.tool-icon-circle').classList.add('tool-pulse');
                });
                tool.addEventListener('mouseleave', () => {
                    tool.querySelector('.tool-icon-circle').classList.remove('tool-pulse');
                });
            });
        },

        updateStatsDynamically() {
            const stats = document.querySelectorAll('.stat-num');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateNumber(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 1 });

            stats.forEach(stat => observer.observe(stat));
        },

        animateNumber(element) {
            const target = parseInt(element.innerText.replace('+', '').replace('%', ''));
            const suffix = element.innerText.includes('+') ? '+' : (element.innerText.includes('%') ? '%' : '');
            let count = 0;
            const speed = 2000 / target;

            const updateCount = () => {
                if (count < target) {
                    count++;
                    element.innerText = count + suffix;
                    setTimeout(updateCount, speed);
                } else {
                    element.innerText = target + suffix;
                }
            };
            updateCount();
        }
    };

    const FormHandler = {
        initNewsletter() {
            const form = document.querySelector('.footer-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const input = form.querySelector('input');
                    if (this.validateEmail(input.value)) {
                        this.showFeedback(form, 'تم الاشتراك بنجاح!', 'success');
                        input.value = '';
                    } else {
                        this.showFeedback(form, 'البريد غير صالح', 'error');
                    }
                });
            }
        },

        validateEmail(email) {
            return String(email)
                .toLowerCase()
                .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        },

        showFeedback(parent, message, type) {
            const feedback = document.createElement('div');
            feedback.className = `form-feedback ${type}`;
            feedback.innerText = message;
            parent.appendChild(feedback);
            setTimeout(() => feedback.remove(), 3000);
        }
    };

    const CoreInitializer = {
        bindEvents() {
            DOM_ELEMENTS.sidebarToggle.addEventListener('click', () => NavigationManager.toggleSidebar());
            DOM_ELEMENTS.sidebarClose.addEventListener('click', () => NavigationManager.toggleSidebar());
            window.addEventListener('scroll', () => NavigationManager.handleScroll());
            
            if (DOM_ELEMENTS.privacyOpen) {
                DOM_ELEMENTS.privacyOpen.addEventListener('click', (e) => ModalManager.openPrivacyModal(e));
            }
            if (DOM_ELEMENTS.privacyClose) {
                DOM_ELEMENTS.privacyClose.addEventListener('click', () => ModalManager.closePrivacyModal());
            }
            if (DOM_ELEMENTS.privacyAccept) {
                DOM_ELEMENTS.privacyAccept.addEventListener('click', () => ModalManager.closePrivacyModal());
            }
            if (DOM_ELEMENTS.privacyModal) {
                DOM_ELEMENTS.privacyModal.addEventListener('click', (e) => ModalManager.handleOverlayClick(e));
            }

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    if (UI_STATE.isSidebarOpen) NavigationManager.toggleSidebar();
                    if (UI_STATE.isModalOpen) ModalManager.closePrivacyModal();
                }
            });
        },

        initAll() {
            AnimationEngine.initLoader();
            this.bindEvents();
            InteractionEngine.initFaq();
            InteractionEngine.initSmoothScroll();
            InteractionEngine.initBackToTop();
            ToolModule.initToolHover();
            ToolModule.updateStatsDynamically();
            FormHandler.initNewsletter();
            
            if (DOM_ELEMENTS.neonCanvas) {
                new NeonBackground(DOM_ELEMENTS.neonCanvas);
            }

            console.log("L'WESMOU OS Core v0.4 Loaded Successfully.");
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        CoreInitializer.initAll();
    });

    return {
        toggleSidebar: NavigationManager.toggleSidebar,
        openPrivacy: ModalManager.openPrivacyModal
    };

})();
.footer-v4-list, .footer-v4-list ul {
    list-style: none !important;
    padding: 0 !important;
    margin: 0 !important;
}

.footer-v4-list li a {
    color: var(--text-gray) !important;
    display: block;
    padding: 5px 0;
}

#backToTop {
    left: 20px !important;
    right: auto !important;
    bottom: 25px !important;
}

@media (max-width: 768px) {
    .footer-v4-grid {
        display: flex !important;
        flex-direction: column !important;
        gap: 30px !important;
        text-align: center;
    }
    .footer-v4-col {
        width: 100% !important;
        margin-bottom: 20px;
    }
}
