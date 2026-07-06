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

                    <div class="nav-dropdown">
                        <button class="nav-pill nav-pill--projects" id="projectsToggle" aria-expanded="false">
                            Projects
                            <svg class="chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <div class="projects-dropdown" id="projectsDropdown" aria-hidden="true">
                            <div class="projects-dropdown-inner">
                                <a href="../Calculator/calculator.html" class="dropdown-link">Calculator</a>
                                <a href="../To-do-list/list.html" class="dropdown-link">To do list</a>
                                <a href="../Number-guessing-game/guess.html" class="dropdown-link">Guessing game</a>
                                <a href="../income-tax-calc/tax.html" class="dropdown-link">Tax calculator</a>
                                <a href="../dice-roller/dice.html" class="dropdown-link">Dice roller</a>
                                <a href="https://lucasovbetts-tech.github.io/Macro-tracker/Tracker-app/" target="_blank" class="dropdown-link">Macro tracker</a>
                            </div>
                        </div>
                    </div>

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

        // Collapse projects dropdown when closing the whole nav
        if (!isOpen) collapseProjects();
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
        if (!headerCard.contains(e.target)) {
            headerCard.classList.remove('open');
            headerToggle.setAttribute('aria-expanded', 'false');
            headerNav.setAttribute('aria-hidden', 'true');
            collapseProjects();
        }
    });

    // ── Projects sub-accordion ─────────────────────
    const projectsToggle   = document.getElementById('projectsToggle');
    const projectsDropdown = document.getElementById('projectsDropdown');

    function collapseProjects() {
        projectsToggle.classList.remove('active');
        projectsToggle.setAttribute('aria-expanded', 'false');
        projectsDropdown.classList.remove('open');
        projectsDropdown.setAttribute('aria-hidden', 'true');
    }

    projectsToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = projectsDropdown.classList.toggle('open');
        projectsToggle.classList.toggle('active', isOpen);
        projectsToggle.setAttribute('aria-expanded', isOpen);
        projectsDropdown.setAttribute('aria-hidden', !isOpen);
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
                collapseProjects();
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
