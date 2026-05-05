import { ApiService } from '../services/ApiService.js';
import { DataTable } from '../components/DataTable.js';
import { Modal } from '../components/Modal.js';
import { Toast } from '../components/Toast.js';

export class CartView {
    static titleKey = 'carts_title';

    constructor(app, container) {
        this.app = app;
        this.container = container;
        this.service = new ApiService(app.http, '/carts');
        this.cartItemService = new ApiService(app.http, '/cart-items');
        this.customerService = new ApiService(app.http, '/customers');
        this.productService = new ApiService(app.http, '/products');
        this.modal = new Modal(app.translator);
    }

    async render() {
        this.container.innerHTML = `<div id="dt-carts">Loading...</div><div id="cart-items-panel" style="margin-top:2rem"></div>`;
        try {
            const [carts, customers, products] = await Promise.all([
                this.service.getAll(),
                this.customerService.getAll(),
                this.productService.getAll()
            ]);
            
            this.customers = customers;
            this.products = products;

            this.table = new DataTable('dt-carts', this.app.translator, {
                columns: [
                    { key: 'id', label: 'col_id' },
                    { key: 'customer.email', label: 'col_customer' },
                    { key: 'total', label: 'col_total' }
                ],
                onEdit: (row) => this.showModal(row),
                onDelete: (id) => this.delete(id),
                onView: (row) => this.showCartItems(row)
            });
            this.table.setData(carts);
        } catch (err) {
            Toast.show(this.app.translator.t('error_api'), 'danger');
        }
    }

    showModal(row = null) {
        const isEditing = !!row;
        const custOptions = this.customers.map(c => ({value: c.id, text: c.email}));

        this.modal.show({
            title: isEditing ? this.app.translator.t('edit') : this.app.translator.t('add_btn'),
            fields: [
                { name: 'customer_id', label: 'col_customer', type: 'select', options: custOptions, value: row?.customer_id },
                { name: 'total', label: 'col_total', type: 'number', value: row?.total || 0, step: '0.01' }
            ],
            onSave: async (data) => {
                try {
                    if (isEditing) {
                        await this.service.update(row.id, data);
                    } else {
                        await this.service.create(data);
                    }
                    this.modal.hide();
                    Toast.show(this.app.translator.t('success_saved'));
                    this.render();
                } catch(e) {
                    Toast.show('Error: ' + e.message, 'danger');
                }
            }
        });
    }

    async delete(id) {
        if(confirm('Are you sure?')) {
            try {
                await this.service.delete(id);
                Toast.show(this.app.translator.t('success_deleted'));
                this.render();
            } catch(e) {
                Toast.show('Error deleting', 'danger');
            }
        }
    }

    // CART ITEMS SUB-MANAGEMENT
    showCartItems(cart) {
        const panel = document.getElementById('cart-items-panel');
        panel.innerHTML = `<h3 style="margin-bottom:1rem">Items for Cart #${cart.id}</h3><div id="dt-cart-items"></div>`;
        
        // Scroll to items
        panel.scrollIntoView({ behavior: 'smooth' });
        
        const itemsWrapper = new DataTable('dt-cart-items', this.app.translator, {
            columns: [
                { key: 'id', label: 'col_id' },
                { key: 'product.name', label: 'col_name' },
                { key: 'quantity', label: 'Quantity' },
                { key: 'price', label: 'col_price' }
            ],
            onEdit: (row) => this.showItemModal(cart.id, row, () => this.showCartItems(cart)),
            onDelete: async (id) => {
                if(confirm('Delete item?')){
                    await this.cartItemService.delete(id);
                    this.showCartItems(cart); // reload this cart
                    this.render(); // update parent cart total
                }
            }
        });
        itemsWrapper.setData(cart.items || []);
    }

    showItemModal(cartId, row, onSuccess) {
        const isEditing = !!row;
        const prodOptions = this.products.map(p => ({value: p.id, text: `${p.name} ($${p.price})`}));
        
        this.modal.show({
            title: isEditing ? 'Edit Item' : 'Add Item',
            fields: [
                { name: 'cart_id', label: 'Cart ID', type: 'text', value: cartId, disabled: true },
                { name: 'product_id', label: 'Product', type: 'select', options: prodOptions, value: row?.product_id },
                { name: 'quantity', label: 'Quantity', type: 'number', required: true, value: row?.quantity || 1},
                { name: 'price', label: 'col_price', type: 'number', required: true, value: row?.price || 0, step: '0.01'}
            ],
            onSave: async (data) => {
                data.cart_id = cartId; 
                try {
                    if (isEditing) {
                        await this.cartItemService.update(row.id, data);
                    } else {
                        await this.cartItemService.create(data);
                    }
                    this.modal.hide();
                    Toast.show('Item saved');
                    this.render(); // We must reload entire cart to fetch updated relations. Wait, `this.render` overrides the cart items panel. So we let it re-render the whole layout, then user can click view again.
                } catch(e) {
                    Toast.show('Error: ' + e.message, 'danger');
                }
            }
        });
    }
}
