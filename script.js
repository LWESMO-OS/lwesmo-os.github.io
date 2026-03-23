/**
 * L'WESMOU OS - الملف التفاعلي الشامل
 * يحتوي على كافة البيانات والوظائف التفاعلية للمشروع
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. البيانات الكاملة (مطابقة للمشروع الأصلي)
    const tools = [
        { name: 'مدير التحميلات', desc: 'حمل محتواك المفضل من أي مكان بجودة تصل إلى 4K مع خيارات تخصيص كاملة.' },
        { name: 'مستكشف الملفات', desc: 'أداتك الشاملة لإدارة ملفاتك: دمج، ترجمة، ضغط، وقفل ملفاتك بذكاء.' },
        { name: 'محرر الوسائط', desc: 'ارفع جودة صورك وفيديوهاتك، أزل الضوضاء، وأضف لمسات احترافية.' },
        { name: 'مدير المهام', desc: 'نظم وقتك، أضف تذكيرات، وأجل مهامك بمرونة تامة.' },
        { name: 'الخزنة', desc: 'احمِ خصوصيتك واحفظ ملفاتك الخاصة في مكان مشفر بعيداً عن الأعين.' },
    ];

    const faqs = [
        { q: 'ما هو L\'WESMOU OS؟', a: 'هو نظام إنتاجية متكامل مصمم لأجهزة أندرويد، يركز على الخصوصية والكفاءة.' },
        { q: 'هل التطبيق مجاني؟', a: 'نعم، التطبيق متاح مجاناً، مع وجود إعلانات لدعم تطويره.' },
        { q: 'هل يحتوي التطبيق على إعلانات؟', a: 'نعم، يحتوي التطبيق على إعلانات لدعم استمرارية التطوير وتوفير الميزات.' },
        { q: 'هل تؤثر الإعلانات على تجربة الاستخدام؟', a: 'لا، تم تصميم الإعلانات بعناية لتكون غير مزعجة ولا تؤثر على تجربة الاستخدام.' },
        { q: 'هل يحتاج التطبيق إلى إنترنت؟', a: 'نعم، بعض الأدوات تحتاج للإنترنت، بينما تعمل الأدوات الأساسية الأخرى دون الحاجة إليه.' },
        { q: 'هل تعمل جميع الأدوات بدون إنترنت؟', a: 'لا، بعض الأدوات المتقدمة تتطلب اتصالاً بالإنترنت، لكن الأدوات الأساسية تعمل محلياً.' },
        { q: 'هل بياناتي آمنة؟', a: 'نعم، خصوصيتك هي أولويتنا، حيث يتم تنفيذ معظم العمليات محلياً على جهازك.' },
        { q: 'كيف أقوم بتحميل الملفات؟', a: 'يمكنك تحميل الملفات بسهولة عبر أداة مدير التحميلات باستخدام الروابط أو البحث الذكي.' },
        { q: 'هل يدعم التطبيق ملفات PDF؟', a: 'نعم، يمكنك تعديل، دمج، وترجمة ملفات PDF بكل سهولة.' },
        { q: 'هل يمكنني زيادة جودة الفيديوهات؟', a: 'نعم، يوفر محرر الوسائط أدوات احترافية لرفع جودة الصور والفيديوهات.' },
        { q: 'كيف أضيف تذكيراً لمهامي؟', a: 'عبر أداة مدير المهام، يمكنك إضافة تذكيرات ذكية وتأجيل المهام.' },
        { q: 'أين تُحفظ الملفات الخاصة؟', a: 'تُحفظ في "الخزنة" المشفرة داخل أعماق النظام، بعيداً عن أي وصول خارجي.' },
        { q: 'هل التطبيق يدعم اللغة العربية؟', a: 'نعم، التطبيق يدعم اللغة العربية بالكامل لسهولة الاستخدام.' },
        { q: 'هل يمكنني إزالة العلامة المائية؟', a: 'نعم، يوفر محرر الوسائط أدوات لإزالة العلامات المائية والضوضاء من الصور والفيديوهات.' },
        { q: 'هل التطبيق يستهلك البطارية؟', a: 'التطبيق مصمم ليكون خفيفاً جداً ولا يستهلك البطارية بشكل غير مبرر.' },
        { q: 'هل يمكنني تأجيل المهام؟', a: 'نعم، يمكنك تأجيل المهام غير المحققة بمرونة عالية لتنظيم وقتك بشكل أفضل.' },
        { q: 'هل يمكنني فك قفل ملفات Word؟', a: 'نعم، يتيح لك مستكشف الملفات قفل وفك قفل ملفات Word و Excel.' },
        { q: 'هل يدعم التطبيق فلاتر الصوت؟', a: 'نعم، يمكنك إضافة فلاتر احترافية للصوت عبر محرر الوسائط.' },
        { q: 'هل يتم تخزين الصور في السحابة؟', a: 'لا، يتم تخزين الصور والملفات محلياً على جهازك لضمان خصوصيتك.' },
        { q: 'كيف أتواصل مع المطور؟', a: 'يمكنك التواصل معنا عبر روابط التواصل الاجتماعي المتاحة في قسم المطور.' },
        { q: 'هل التطبيق متوافق مع جميع إصدارات أندرويد؟', a: 'نعم، تم تصميم التطبيق ليكون متوافقاً مع معظم إصدارات أندرويد الحديثة.' }
    ];

    const privacyPolicy = [
        "1. جمع البيانات: نلتزم بجمع الحد الأدنى من البيانات الضرورية فقط لضمان عمل التطبيق.",
        "2. معالجة البيانات: تتم معالجة معظم البيانات محلياً على جهاز المستخدم لضمان الخصوصية.",
        "3. مشاركة البيانات: لا نقوم ببيع أو مشاركة بياناتك الشخصية مع أطراف ثالثة.",
        "4. أمن البيانات: نستخدم تقنيات تشفير متقدمة لحماية ملفاتك في 'الخزنة'.",
        "5. حقوق المستخدم: يحق لك الوصول إلى بياناتك أو طلب حذفها في أي وقت.",
        "6. الإعلانات: نستخدم إعلانات غير مزعجة لدعم التطوير، ولا نجمع بيانات تتبع حساسة.",
        "7. روابط الطرف الثالث: لا نتحمل مسؤولية محتوى المواقع الخارجية التي قد تظهر في الإعلانات.",
        "8. خصوصية الأطفال: التطبيق غير مخصص للأطفال دون سن 13 عاماً.",
        "9. تحديثات السياسة: قد نقوم بتحديث هذه السياسة، وسيتم إخطارك بأي تغييرات جوهرية.",
        "10. اتصل بنا: يمكنك التواصل معنا عبر البريد الإلكتروني لأي استفسار."
    ];

    const termsOfUse = [
        "1. قبول الشروط: باستخدامك للتطبيق، أنت توافق على هذه الشروط بالكامل.",
        "2. الترخيص: نمنحك ترخيصاً محدوداً وغير حصري لاستخدام التطبيق.",
        "3. سلوك المستخدم: يمنع استخدام التطبيق لأي أغراض غير قانونية أو ضارة.",
        "4. الملكية الفكرية: جميع الحقوق الفكرية للتطبيق محفوظة للمطور.",
        "5. إخلاء المسؤولية: التطبيق مقدم 'كما هو' دون أي ضمانات صريحة أو ضمنية.",
        "6. تحديد المسؤولية: لا نتحمل مسؤولية أي أضرار ناتجة عن استخدام التطبيق.",
        "7. إنهاء الخدمة: نحتفظ بالحق في إنهاء وصولك للتطبيق في حال مخالفة الشروط.",
        "8. القانون الحاكم: تخضع هذه الشروط للقوانين المعمول بها في بلد المطور.",
        "9. تعديل الشروط: يحق لنا تعديل هذه الشروط، واستمرارك في استخدام التطبيق يعني موافقتك.",
        "10. معلومات الاتصال: لأي استفسارات قانونية، يرجى التواصل معنا عبر البريد الإلكتروني."
    ];

    // 2. ملء الأدوات في الصفحة
    const toolsGrid = document.getElementById('toolsGrid');
    if (toolsGrid) {
        tools.forEach(tool => {
            toolsGrid.innerHTML += `
                <div class="tool-card bg-zinc-900/50 p-8 rounded-3xl border border-white/5 hover:border-orange-500/30 transition-all shadow-xl flex flex-col gap-6 cursor-pointer">
                    <span class="font-bold text-xl">${tool.name}</span>
                    <p class="text-zinc-400 leading-relaxed">${tool.desc}</p>
                </div>
            `;
        });
    }

    // 3. ملء الأسئلة الشائعة في الصفحة
    const faqContainer = document.getElementById('faqContainer');
    if (faqContainer) {
        faqs.forEach((faq, index) => {
            const div = document.createElement('div');
            div.className = "bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden";
            div.innerHTML = `
                <button class="faq-toggle w-full p-6 text-right font-semibold text-lg hover:bg-white/5 transition-colors flex justify-between items-center">
                    ${index + 1}. ${faq.q}
                    <span>▼</span>
                </button>
                <div class="faq-answer px-6 pb-6 text-zinc-400 leading-relaxed hidden">${faq.a}</div>
            `;
            // إضافة وظيفة التبديل (Accordion)
            div.querySelector('.faq-toggle').addEventListener('click', function() {
                this.nextElementSibling.classList.toggle('hidden');
            });
            faqContainer.appendChild(div);
        });
    }

    // 4. وظائف المودال (الخصوصية والشروط)
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    function openModal(title, contentArray) {
        if (modalTitle && modalContent && modal) {
            modalTitle.innerText = title;
            modalContent.innerHTML = contentArray.map(item => `<p>${item}</p>`).join('');
            modal.classList.remove('hidden');
        }
    }

    const openPrivacyBtn = document.getElementById('openPrivacy');
    const openTermsBtn = document.getElementById('openTerms');
    const closeModalBtn = document.getElementById('closeModal');

    if (openPrivacyBtn) openPrivacyBtn.addEventListener('click', () => openModal('سياسة الخصوصية', privacyPolicy));
    if (openTermsBtn) openTermsBtn.addEventListener('click', () => openModal('شروط الاستخدام', termsOfUse));
    if (closeModalBtn && modal) closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));

    // 5. القائمة الجانبية (Sidebar)
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
        });
    }

    // 6. زر العودة للأعلى (Scroll to Top)
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.remove('hidden');
            } else {
                scrollTopBtn.classList.add('hidden');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 7. تفعيل أيقونات Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
