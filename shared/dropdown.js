// Replaces native <select class="js-dropdown"> elements with a styled,
// animated dropdown. The original select stays in the DOM (hidden) and
// keeps holding the value, so any code reading select.value still works.
(function () {
    const CHEVRON = `<svg class="dd-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    function enhance(select) {
        const dd = document.createElement('div');
        dd.className = 'dd';

        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'dd-trigger';
        trigger.setAttribute('aria-haspopup', 'listbox');
        trigger.setAttribute('aria-expanded', 'false');

        // Carry the select's accessible name over to the trigger
        const ownLabel = select.getAttribute('aria-label');
        const forLabel = select.id ? document.querySelector(`label[for="${select.id}"]`) : null;
        if (ownLabel) trigger.setAttribute('aria-label', ownLabel);
        else if (forLabel) trigger.setAttribute('aria-label', forLabel.textContent.trim());

        trigger.innerHTML = `<span class="dd-value"></span>${CHEVRON}`;

        const menu = document.createElement('div');
        menu.className = 'dd-menu';
        menu.setAttribute('role', 'listbox');

        [...select.options].forEach(opt => {
            const o = document.createElement('button');
            o.type = 'button';
            o.className = 'dd-option';
            o.setAttribute('role', 'option');
            o.setAttribute('aria-selected', String(opt.selected));
            o.dataset.value = opt.value;
            o.textContent = opt.textContent;
            o.addEventListener('click', () => choose(o));
            menu.appendChild(o);
        });

        function syncLabel() {
            trigger.querySelector('.dd-value').textContent =
                select.options[select.selectedIndex].textContent;
        }

        function open() {
            dd.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
        }

        function close() {
            dd.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
        }

        function choose(option) {
            select.value = option.dataset.value;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            menu.querySelectorAll('.dd-option').forEach(o =>
                o.setAttribute('aria-selected', String(o === option))
            );
            syncLabel();
            close();
            trigger.focus();
        }

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            dd.classList.contains('open') ? close() : open();
        });

        document.addEventListener('click', (e) => {
            if (!dd.contains(e.target)) close();
        });

        dd.addEventListener('keydown', (e) => {
            const options = [...menu.querySelectorAll('.dd-option')];
            const idx = options.indexOf(document.activeElement);

            if (e.key === 'Escape') {
                close();
                trigger.focus();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (!dd.classList.contains('open')) open();
                (options[idx + 1] || options[0]).focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                (options[idx - 1] || options[options.length - 1]).focus();
            }
        });

        dd.appendChild(trigger);
        dd.appendChild(menu);
        select.classList.add('dd-native');
        select.tabIndex = -1;
        select.insertAdjacentElement('afterend', dd);
        syncLabel();
    }

    document.querySelectorAll('select.js-dropdown').forEach(enhance);
})();
