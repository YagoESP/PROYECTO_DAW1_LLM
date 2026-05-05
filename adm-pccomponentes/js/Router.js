import { DashboardView } from './views/DashboardView.js';
import { CategoryView } from './views/CategoryView.js';
import { ProductView } from './views/ProductView.js';
import { CustomerView } from './views/CustomerView.js';
import { CartView } from './views/CartView.js';

export class Router {
    constructor(app) {
        this.app = app;
        this.root = document.getElementById('router-view');
        this.routes = {
            '#/dashboard': DashboardView,
            '#/categories': CategoryView,
            '#/products': ProductView,
            '#/customers': CustomerView,
            '#/carts': CartView
        };
        
        window.addEventListener('hashchange', () => this.handleRoute());
        
        if(!window.location.hash) {
            window.location.hash = '#/dashboard';
        } else {
            this.handleRoute();
        }
    }
    
    handleRoute() {
        const path = window.location.hash;
        const ViewClass = this.routes[path] || this.routes['#/dashboard'];
        this.root.innerHTML = '';
        const view = new ViewClass(this.app, this.root);
        
        const titleEl = document.getElementById('page-title');
        titleEl.textContent = this.app.translator.t(ViewClass.titleKey);
        
        view.render();
    }
}
