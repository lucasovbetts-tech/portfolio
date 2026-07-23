(function () {
    const HEADER_HTML = `
    <header class="top">
        <div class="branding">
            <img class="logo" src="../images/logo.png" alt="Logo">
            <h1>Lucas's portfolio</h1>
        </div>
        <nav class="headerLinks">
            <button class="theme-btn theme-btn--top" id="themeToggle" aria-label="Switch between dark and light mode">
                <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
                <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </button>
            <a href="../main-page/index.html">Home</a>
            <a href="../projects-page/projects.html">Projects</a>
            <a href="https://github.com/" target="_blank">Github</a>
        </nav>
    </header>`;

    const FOOTER_HTML = `
    <footer class="footer">
        <div class="line"></div>
        <div class="contact-section">
            <h3>Get In Touch</h3>
            <div class="contact-info">
                <p>
                    <a href="mailto:lobetts@outlook.com">📧 lobetts@outlook.com</a>
                </p>
                <div class="social-links">
                    <a href="https://github.com/" target="_blank" title="GitHub">GitHub</a>
                    <span>•</span>
                    <a href="https://linkedin.com/" target="_blank" title="LinkedIn">LinkedIn</a>
                    <span>•</span>
                    <a href="https://twitter.com/" target="_blank" title="Twitter">Twitter</a>
                </div>
            </div>
        </div>
        <div class="line"></div>
    </footer>`;

    const headerSlot = document.getElementById('site-header');
    if (headerSlot) headerSlot.outerHTML = HEADER_HTML;

    // Highlight the current page in the nav (presentation only)
    document.querySelectorAll('.headerLinks a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('..') && location.pathname.endsWith(href.slice(2))) {
            link.classList.add('active');
        }
    });

    const footerSlot = document.getElementById('site-footer');
    if (footerSlot) footerSlot.outerHTML = FOOTER_HTML;
})();
