export class DashboardView {
    static titleKey = 'dashboard_title';
    
    constructor(app, container) {
        this.app = app;
        this.container = container;
    }

    render() {
        this.container.innerHTML = `
            <div class="glass-panel" style="padding: 2rem;">
                <h2>Welcome to AdminPC</h2>
                <p style="color: var(--text-secondary); margin-top: 1rem;">
                    Select an option from the sidebar to manage your eCommerce backend.
                </p>
                <div style="display:flex; gap: 1rem; margin-top:2rem;">
                    <div style="background: var(--bg-color); padding: 1.5rem; border-radius: 8px; flex: 1; border: 1px solid var(--panel-border);">
                        <h3 style="color: var(--text-primary);">Products</h3>
                        <p style="margin-top: 10px; opacity: 0.8">Access all technological products.</p>
                    </div>
                     <div style="background: var(--bg-color); padding: 1.5rem; border-radius: 8px; flex: 1; border: 1px solid var(--panel-border);">
                        <h3 style="color: var(--text-primary);">Carts</h3>
                        <p style="margin-top: 10px; opacity: 0.8">View active user carts and their items.</p>
                    </div>
                </div>
            </div>
        `;
    }
}
