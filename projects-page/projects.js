(function () {
    const grid = document.getElementById('cardsGrid');

    grid.innerHTML = PROJECTS.map((p, i) => `
        <article class="proj-card reveal" style="--delay: ${i * 60}ms">
            <div class="proj-card-top">
                <h2>${p.name}</h2>
                <span class="proj-tag">${p.tag}</span>
            </div>
            <p class="proj-desc">${p.description}</p>
            <div class="proj-actions">
                <a href="${p.url}"${p.external ? ' target="_blank"' : ''} class="proj-btn proj-btn--primary">View Project <span class="arrow">→</span></a>
                ${p.codeUrl
                    ? `<a href="${p.codeUrl}" target="_blank" class="proj-btn proj-btn--ghost">View Code</a>`
                    : '<a class="proj-btn proj-btn--ghost">View Code</a>'}
            </div>
        </article>`
    ).join('');

    // ── Scroll reveal ──────────────────────────────
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
})();
