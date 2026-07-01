(function () {
    const HEADER_HTML = `
    <header class="top">
        <div class="branding">
            <img class="logo" src="../images/logo.png" alt="Logo">
            <h1>Lucas's portfolio</h1>
        </div>
        <nav class="headerLinks">
            <a href="../main-page/index.html">Home</a>
            <div class="dropdown">
                <a href="">Projects</a>
                <div class="dropdownContent">
                    <a href="../Calculator/calculator.html">Calculator</a>
                    <a href="../To-do-list/list.html">To do list</a>
                    <a href="../Number-guessing-game/guess.html">Guessing game</a>
                    <a href="../income-tax-calc/tax.html">Tax calculator</a>
                    <a href="../dice-roller/dice.html">Dice roller</a>
                    <a href="https://lucasovbetts-tech.github.io/Macro-tracker/Tracker-app/" target="_blank">Macro tracker</a>
                </div>
            </div>
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

    const footerSlot = document.getElementById('site-footer');
    if (footerSlot) footerSlot.outerHTML = FOOTER_HTML;
})();
