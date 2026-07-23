// Applies the saved theme before first paint (load this in <head>),
// and handles clicks on any #themeToggle button via delegation so it
// works no matter which header injects the button.
(function () {
    const root = document.documentElement;

    if (localStorage.getItem('theme') === 'light') {
        root.setAttribute('data-theme', 'light');
    }

    document.addEventListener('click', function (e) {
        if (!e.target.closest('#themeToggle')) return;

        const isLight = root.getAttribute('data-theme') === 'light';
        if (isLight) {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
})();
