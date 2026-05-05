import { ApiService } from '../services/ApiService.js';
import { DataTable } from '../components/DataTable.js';
import { Modal } from '../components/Modal.js';
import { Toast } from '../components/Toast.js';

export class CustomerView {
    static titleKey = 'customers_title';

    constructor(app, container) {
        this.app = app;
        this.container = container;
        this.service = new ApiService(app.http, '/customers');
        this.modal = new Modal(app.translator);
    }

    async render() {
        this.container.innerHTML = `<div id="dt-customers">Loading...</div>`;
        try {
            const customers = await this.service.getAll();
            
            this.table = new DataTable('dt-customers', this.app.translator, {
                columns: [
                    { key: 'id', label: 'col_id' },
                    { key: 'name', label: 'col_name' },
                    { key: 'lastname', label: 'col_lastname' },
                    { key: 'email', label: 'col_email' }
                ],
                onEdit: (row) => this.showModal(row),
                onDelete: (id) => this.delete(id)
            });
            this.table.setData(customers);
        } catch (err) {
            Toast.show(this.app.translator.t('error_api'), 'danger');
        }
    }

    showModal(row = null) {
        const isEditing = !!row;

        this.modal.show({
            title: isEditing ? this.app.translator.t('edit') : this.app.translator.t('add_btn'),
            fields: [
                { name: 'name', label: 'col_name', type: 'text', required: true, value: row?.name },
                { name: 'lastname', label: 'col_lastname', type: 'text', required: true, value: row?.lastname },
                { name: 'email', label: 'col_email', type: 'email', required: true, value: row?.email },
                // Password is required on creation, optional on edit
                { name: 'password', label: 'Password', type: 'password', required: !isEditing, value: '' }
            ],
            onSave: async (data) => {
                if(isEditing && !data.password) delete data.password; // Don't send empty password if editing
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
