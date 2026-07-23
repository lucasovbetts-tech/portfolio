(function () {
    const HEADER_HTML = `
    <header class="header-wrapper">
        <div class="header-card" id="headerCard">
            <div class="header-top-row">
                <span class="header-brand">Lucas</span>
                <button class="header-btn" id="headerToggle" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="icon-dots">
                        <span></span><span></span><span></span>
                    </span>
                    <em class="icon-close">✕</em>
                </button>
            </div>

            <nav class="header-nav" id="headerNav" aria-hidden="true">
                <div class="header-nav-inner">
                    <a href="../main-page/index.html" class="nav-pill">Home</a>

                    <a href="../projects-page/projects.html" class="nav-pill">
                        Projects
                        <svg class="chevron chevron--link" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>

                    <a href="https://github.com/lucasovbetts-tech?tab=repositories" target="_blank" class="nav-pill">Github</a>
                </div>
            </nav>
        </div>
    </header>`;

    const FOOTER_HTML = `
    <footer class="footer">
        <div class="line"></div>
        <div class="contact-section reveal">
            <h3>Get In Touch</h3>
            <div class="contact-info">
                <p><a href="mailto:lobetts@outlook.com">lobetts@outlook.com</a></p>
                <div class="social-links">
                    <a href="https://github.com/" target="_blank">GitHub</a>
                    <span>•</span>
                    <a href="https://linkedin.com/" target="_blank">LinkedIn</a>
                    <span>•</span>
                    <a href="https://twitter.com/" target="_blank">Twitter</a>
                </div>
            </div>
        </div>
    </footer>`;

    const headerSlot = document.getElementById('site-header');
    if (headerSlot) headerSlot.outerHTML = HEADER_HTML;

    const footerSlot = document.getElementById('site-footer');
    if (footerSlot) footerSlot.outerHTML = FOOTER_HTML;

    // ── Header open/close ──────────────────────────
    const headerCard    = document.getElementById('headerCard');
    const headerToggle  = document.getElementById('headerToggle');
    const headerNav     = document.getElementById('headerNav');

    headerToggle.addEventListener('click', () => {
        const isOpen = headerCard.classList.toggle('open');
        headerToggle.setAttribute('aria-expanded', isOpen);
        headerNav.setAttribute('aria-hidden', !isOpen);
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
        if (!headerCard.contains(e.target)) {
            headerCard.classList.remove('open');
            headerToggle.setAttribute('aria-expanded', 'false');
            headerNav.setAttribute('aria-hidden', 'true');
        }
    });

    // ── Hide header on scroll down ─────────────────
    const headerWrapper = document.querySelector('.header-wrapper');
    let lastScrollY = 0;
    let scrollYWhenHidden = 0;
    const HIDE_AFTER = 80;   // px scrolled down before hiding
    const SHOW_AFTER = 120;  // px scrolled up before re-showing

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= HIDE_AFTER) {
            // Near the top — always show
            headerWrapper.classList.remove('header-hidden');
            scrollYWhenHidden = 0;
        } else if (currentScrollY > lastScrollY) {
            // Scrolling down — hide once
            if (!headerWrapper.classList.contains('header-hidden')) {
                scrollYWhenHidden = currentScrollY;
                headerWrapper.classList.add('header-hidden');
                headerCard.classList.remove('open');
                headerToggle.setAttribute('aria-expanded', 'false');
                headerNav.setAttribute('aria-hidden', 'true');
            }
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up — only show after SHOW_AFTER px of upward travel
            if (scrollYWhenHidden - currentScrollY >= SHOW_AFTER) {
                headerWrapper.classList.remove('header-hidden');
            }
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
})();
