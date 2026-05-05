export class DataTable {
    constructor(containerId, translator, config) {
        this.container = document.getElementById(containerId);
        this.t = translator;
        this.config = config; // { columns: [{key, label}], onEdit, onDelete, onView }
        this.data = [];
        this.filteredData = [];
        
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.sortKey = 'id';
        this.sortAsc = true;
        this.searchTerm = '';
    }

    setData(data) {
        this.data = data;
        this.applyFilters();
    }

    applyFilters() {
        // Search
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            this.filteredData = this.data.filter(item => 
                Object.values(item).some(val => 
                    val && val.toString().toLowerCase().includes(term)
                )
            );
        } else {
            this.filteredData = [...this.data];
        }

        // Sort
        this.filteredData.sort((a, b) => {
            const getVal = (obj, path) => {
                let v = obj;
                path.split('.').forEach(k => v = v ? v[k] : '');
                return v;
            };

            let valA = getVal(a, this.sortKey);
            let valB = getVal(b, this.sortKey);
            
            // Number sorting
            if (!isNaN(valA) && !isNaN(valB) && valA !== '' && valB !== '' && valA !== null && valB !== null) {
                valA = Number(valA);
                valB = Number(valB);
            } else {
                if (typeof valA === 'string') valA = valA.toLowerCase();
                if (typeof valB === 'string') valB = valB.toLowerCase();
            }
            
            if (valA < valB) return this.sortAsc ? -1 : 1;
            if (valA > valB) return this.sortAsc ? 1 : -1;
            return 0;
        });

        this.currentPage = 1;
        this.render();
    }

    setSort(key) {
        if (this.sortKey === key) {
            this.sortAsc = !this.sortAsc;
        } else {
            this.sortKey = key;
            this.sortAsc = true;
        }
        this.applyFilters();
    }

    setPage(page) {
        this.currentPage = page;
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.className = 'data-table-container';

        // Top Controls
        const controls = document.createElement('div');
        controls.className = 'table-controls';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'search-input';
        searchInput.placeholder = this.t.t('search');
        searchInput.value = this.searchTerm;
        searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value;
            this.applyFilters();
        });
        
        const addBtn = document.createElement('button');
        addBtn.className = 'btn btn-primary';
        addBtn.textContent = this.t.t('add_btn');
        addBtn.onclick = () => this.config.onEdit(null); // null means create

        controls.appendChild(searchInput);
        if(this.config.onEdit) controls.appendChild(addBtn);
        
        // Table
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');
        
        this.config.columns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = this.t.t(col.label) + (this.sortKey === col.key ? (this.sortAsc ? ' ↑' : ' ↓') : '');
            th.onclick = () => this.setSort(col.key);
            trHead.appendChild(th);
        });

        const actionTh = document.createElement('th');
        actionTh.textContent = this.t.t('actions');
        trHead.appendChild(actionTh);
        thead.appendChild(trHead);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const pagedData = this.filteredData.slice(start, start + this.itemsPerPage);

        pagedData.forEach(row => {
            const tr = document.createElement('tr');
            this.config.columns.forEach(col => {
                const td = document.createElement('td');
                // Support nested objects like row.category.name
                const keys = col.key.split('.');
                let val = row;
                keys.forEach(k => val = val ? val[k] : '');
                td.textContent = val;
                tr.appendChild(td);
            });
            
            // Actions
            const tdAction = document.createElement('td');
            if (this.config.onView) {
                const btnView = document.createElement('button');
                btnView.className = 'btn';
                btnView.textContent = this.t.t('btn_view_items') || 'View';
                btnView.onclick = () => this.config.onView(row);
                tdAction.appendChild(btnView);
            }
            if (this.config.onEdit) {
                const btnEdit = document.createElement('button');
                btnEdit.className = 'btn text-accent';
                btnEdit.textContent = this.t.t('edit');
                btnEdit.onclick = () => this.config.onEdit(row);
                tdAction.appendChild(btnEdit);
            }
            if (this.config.onDelete) {
                const btnDel = document.createElement('button');
                btnDel.className = 'btn btn-danger';
                btnDel.style.marginLeft = '8px';
                btnDel.textContent = this.t.t('delete');
                btnDel.onclick = () => this.config.onDelete(row.id);
                tdAction.appendChild(btnDel);
            }
            tr.appendChild(tdAction);
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        // Pagination
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        pagination.innerHTML = `<span>Mostrando ${start + 1} - ${Math.min(start + this.itemsPerPage, this.filteredData.length)} de ${this.filteredData.length}</span>`;
        
        const pageControls = document.createElement('div');
        pageControls.className = 'pagination-controls';
        
        const btnPrev = document.createElement('button');
        btnPrev.textContent = this.t.t('prev');
        btnPrev.disabled = this.currentPage === 1;
        btnPrev.onclick = () => this.setPage(this.currentPage - 1);
        
        const btnNext = document.createElement('button');
        btnNext.textContent = this.t.t('next');
        btnNext.disabled = this.currentPage === totalPages || totalPages === 0;
        btnNext.onclick = () => this.setPage(this.currentPage + 1);

        pageControls.appendChild(btnPrev);
        pageControls.appendChild(btnNext);
        pagination.appendChild(pageControls);

        wrapper.appendChild(controls);
        wrapper.appendChild(table);
        wrapper.appendChild(pagination);
        this.container.appendChild(wrapper);
    }
}
