// Simple hash router

(function() {
    let currentScript = null;

    function loadPage() {
        const page = window.location.hash.slice(1) || 'home';
        const container = document.getElementById('mainContent');
        
        if (!container) return;

        // Clear container
        container.innerHTML = '';

        // Update nav
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${page}`) {
                link.classList.add('active');
            }
        });

        // Remove old script
        if (currentScript) {
            currentScript.remove();
        }

        // Load page script
        currentScript = document.createElement('script');
        currentScript.src = `src/pages/${page}.js`;
        
        currentScript.onload = () => {
            const initFunc = window[`init${page.charAt(0).toUpperCase() + page.slice(1)}`];
            if (initFunc) {
                initFunc(container);
            } else {
                container.innerHTML = `<h1 class="page-title">Error: initFunction not found</h1>`;
            }
        };

        currentScript.onerror = () => {
            container.innerHTML = `<h1 class="page-title">404 - Page "${page}" not found</h1>`;
        };

        document.body.appendChild(currentScript);
    }

    window.addEventListener('hashchange', loadPage);
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadPage);
    } else {
        loadPage();
    }
})();