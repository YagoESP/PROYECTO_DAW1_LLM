export const translations = {
    es: {
        nav_dashboard: "Tablero",
        nav_categories: "Categorías",
        nav_products: "Productos",
        nav_customers: "Clientes",
        nav_carts: "Carritos",
        dashboard_title: "Tablero",
        categories_title: "Gestión de Categorías",
        products_title: "Gestión de Productos",
        customers_title: "Gestión de Clientes",
        carts_title: "Gestión de Carritos",
        search: "Buscar...",
        add_btn: "Añadir Nuevo",
        prev: "Anterior",
        next: "Siguiente",
        edit: "Editar",
        delete: "Borrar",
        save: "Guardar",
        cancel: "Cancelar",
        actions: "Acciones",
        loading: "Cargando...",
        success_saved: "Guardado correctamente",
        success_deleted: "Eliminado correctamente",
        error_api: "Error conectando a la API",
        
        // Products
        col_id: "ID",
        col_name: "Nombre",
        col_price: "Precio",
        col_discount: "Descuento",
        col_category: "Categoría",
        col_description: "Descripción",
        
        // Customers
        col_lastname: "Apellidos",
        col_email: "Correo",

        // Carts
        col_customer: "Cliente",
        col_total: "Total",
        btn_view_items: "Ver Ítems"
    },
    en: {
        nav_dashboard: "Dashboard",
        nav_categories: "Categories",
        nav_products: "Products",
        nav_customers: "Customers",
        nav_carts: "Carts",
        dashboard_title: "Dashboard",
        categories_title: "Category Management",
        products_title: "Product Management",
        customers_title: "Customer Management",
        carts_title: "Cart Management",
        search: "Search...",
        add_btn: "Add New",
        prev: "Previous",
        next: "Next",
        edit: "Edit",
        delete: "Delete",
        save: "Save",
        cancel: "Cancel",
        actions: "Actions",
        loading: "Loading...",
        success_saved: "Saved successfully",
        success_deleted: "Deleted successfully",
        error_api: "API Connection Error",
        
        // Products
        col_id: "ID",
        col_name: "Name",
        col_price: "Price",
        col_discount: "Discount",
        col_category: "Category",
        col_description: "Description",

        // Customers
        col_lastname: "Lastname",
        col_email: "Email",

        // Carts
        col_customer: "Customer",
        col_total: "Total",
        btn_view_items: "View Items"
    }
};

export class Translator {
    constructor() {
        this.lang = localStorage.getItem('lang') || 'es';
    }

    setLanguage(lang) {
        this.lang = lang;
        localStorage.setItem('lang', lang);
        this.translateDOM();
    }

    t(key) {
        return translations[this.lang][key] || key;
    }

    translateDOM() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (el.tagName === 'INPUT' && el.type === 'text') {
                el.placeholder = this.t(key);
            } else {
                el.textContent = this.t(key);
            }
        });
    }
}
