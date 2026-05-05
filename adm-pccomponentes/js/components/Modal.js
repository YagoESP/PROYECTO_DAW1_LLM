export class Modal {
    constructor(translator) {
        this.t = translator;
        this.container = document.getElementById('modal-container');
    }

    show(options) {
        // options: title, fields: [{name, label, type, required, options, value}], onSave
        this.container.innerHTML = '';
        
        const content = document.createElement('div');
        content.className = 'modal-content';
        
        const title = document.createElement('h3');
        title.textContent = options.title;
        title.style.marginBottom = '1.5rem';
        content.appendChild(title);

        const form = document.createElement('form');
        form.onsubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            options.onSave(data);
        };

        options.fields.forEach(f => {
            const group = document.createElement('div');
            group.className = 'form-group';
            
            const label = document.createElement('label');
            label.textContent = this.t.t(f.label) || f.label;
            
            let input;
            if (f.type === 'select') {
                input = document.createElement('select');
                input.name = f.name;
                f.options.forEach(opt => {
                    const o = document.createElement('option');
                    o.value = opt.value;
                    o.textContent = opt.text;
                    if(opt.value == f.value) o.selected = true;
                    input.appendChild(o);
                });
            } else {
                input = document.createElement('input');
                input.type = f.type || 'text';
                input.name = f.name;
                input.value = f.value || '';
                if(f.step) input.step = f.step;
            }
            if(f.required) input.required = true;
            if(f.disabled) input.disabled = true;

            group.appendChild(label);
            group.appendChild(input);
            form.appendChild(group);
        });

        const actions = document.createElement('div');
        actions.className = 'modal-actions';
        
        const btnCancel = document.createElement('button');
        btnCancel.type = 'button';
        btnCancel.className = 'btn';
        btnCancel.textContent = this.t.t('cancel');
        btnCancel.onclick = () => this.hide();

        const btnSave = document.createElement('button');
        btnSave.type = 'submit';
        btnSave.className = 'btn btn-primary';
        btnSave.textContent = this.t.t('save');

        actions.appendChild(btnCancel);
        actions.appendChild(btnSave);
        form.appendChild(actions);

        content.appendChild(form);
        this.container.appendChild(content);
        this.container.classList.remove('hidden');
    }

    hide() {
        this.container.classList.add('hidden');
        this.container.innerHTML = '';
    }
}
