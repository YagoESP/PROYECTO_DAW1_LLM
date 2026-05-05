import { ApiService } from '../services/ApiService.js';
import { DataTable } from '../components/DataTable.js';
import { Modal } from '../components/Modal.js';
import { Toast } from '../components/Toast.js';

export class CategoryView {
    static titleKey = 'categories_title';

    constructor(app, container) {
        this.app = app;
        this.container = container;
        this.service = new ApiService(app.http, '/categories');
        this.modal = new Modal(app.translator);
    }

    async render() {
        this.container.innerHTML = `<div id="dt-categories">Loading...</div>`;
        try {
            const categories = await this.service.getAll();
            this.categories = categories;

            this.table = new DataTable('dt-categories', this.app.translator, {
                columns: [
                    { key: 'id', label: 'col_id' },
                    { key: 'name', label: 'col_name' },
                    { key: 'parent.name', label: 'Parent Category' }
                ],
                onEdit: (row) => this.showModal(row),
                onDelete: (id) => this.delete(id)
            });
            this.table.setData(categories);
        } catch (err) {
            Toast.show(this.app.translator.t('error_api'), 'danger');
        }
    }

    showModal(row = null) {
        const isEditing = !!row;
        
        const catOptions = [{value: '', text: 'None'}].concat(
            this.categories.map(c => ({
                value: c.id, 
                text: c.name
            }))
        );

        this.modal.show({
            title: isEditing ? this.app.translator.t('edit') : this.app.translator.t('add_btn'),
            fields: [
                { name: 'name', label: 'col_name', type: 'text', required: true, value: row?.name },
                { name: 'parent_category_id', label: 'Parent Category', type: 'select', options: catOptions, value: row?.parent_category_id }
            ],
            onSave: async (data) => {
                if(!data.parent_category_id) data.parent_category_id = null;
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
                Toast.show(this.app.translator.t('error_api'), 'danger');
            }
        }
    }
}
