import { Translator } from './i18n/translator.js';
import { HttpClient } from './core/HttpClient.js';
import { Router } from './Router.js';

class App {
    constructor() {
        // App Core dependencies
        this.translator = new Translator();
        this.http = new HttpClient('http://localhost:8000/api');
        
        // Listen to language changes
        document.getElementById('lang-selector').value = this.translator.lang;
        document.getElementById('lang-selector').addEventListener('change', (e) => {
            this.translator.setLanguage(e.target.value);
            // Re-render current view if needed
            window.dispatchEvent(new Event('hashchange')); 
        });

        // Setup active states on sidebar nav
        const updateActiveNav = () => {
            const hash = window.location.hash || '#/dashboard';
            document.querySelectorAll('.nav-item').forEach(el => {
                el.classList.remove('active');
                if (el.getAttribute('href') === hash) el.classList.add('active');
            });
        };
        window.addEventListener('hashchange', updateActiveNav);
        updateActiveNav();

        // Boot Router
        this.translator.translateDOM();
        this.router = new Router(this);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
