import { ApiService } from '../services/ApiService.js';
import { DataTable } from '../components/DataTable.js';
import { Modal } from '../components/Modal.js';
import { Toast } from '../components/Toast.js';

export class ProductView {
    static titleKey = 'products_title';

    constructor(app, container) {
        this.app = app;
        this.container = container;
        this.service = new ApiService(app.http, '/products');
        this.categoryService = new ApiService(app.http, '/categories');
        this.modal = new Modal(app.translator);
    }

    async render() {
        this.container.innerHTML = `<div id="dt-products">Loading...</div>`;
        try {
            const [products, categories] = await Promise.all([
                this.service.getAll(),
                this.categoryService.getAll()
            ]);
            
            this.categories = categories;

            this.table = new DataTable('dt-products', this.app.translator, {
                columns: [
                    { key: 'id', label: 'col_id' },
                    { key: 'name', label: 'col_name' },
                    { key: 'price', label: 'col_price' },
                    { key: 'discount', label: 'col_discount' },
                    { key: 'category.name', label: 'col_category' }
                ],
                onEdit: (row) => this.showModal(row),
                onDelete: (id) => this.delete(id)
            });
            this.table.setData(products);
        } catch (err) {
            Toast.show(this.app.translator.t('error_api'), 'danger');
        }
    }

    showModal(row = null) {
        const isEditing = !!row;
        
        const catOptions = this.categories.map(c => ({
            value: c.id, 
            text: c.name
        }));

        this.modal.show({
            title: isEditing ? this.app.translator.t('edit') : this.app.translator.t('add_btn'),
            fields: [
                { name: 'name', label: 'col_name', type: 'text', required: true, value: row?.name },
                { name: 'category_id', label: 'col_category', type: 'select', options: catOptions, value: row?.category_id },
                { name: 'price', label: 'col_price', type: 'number', required: true, value: row?.price, step: '0.01' },
                { name: 'discount', label: 'col_discount', type: 'number', value: row?.discount || 0, step: '0.01' },
                { name: 'description', label: 'col_description', type: 'text', value: row?.description || '' }
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
                    this.render(); // refresh
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
                Toast.show(this.app.translator.t('error_api'), 'danger');
            }
        }
    }
}
