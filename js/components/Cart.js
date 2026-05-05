export class Cart {
    constructor() {
        this.container = document.querySelector(".cart-content");// Buscamos en el HTML el lugar donde se mostrarán los productos
        const savedCart = localStorage.getItem("item-cart");// Obtenemos los datos guardados del carrito en el navegador
        this.items = savedCart ? JSON.parse(savedCart) : [];// Si hay datos guardados, los transformamos a una lista; si no, creamos una vacía
        if (this.container) this.render();// Ejecutamos la función para mostrar el contenido en pantalla nada más empezar
    }

    // Añade un nuevo producto a la lista actual
    add(product) {
        // Agregamos el producto al final de nuestra lista
        this.items.push(product);
        // Llamamos a la función de guardado para actualizar los datos
        this.save();
    }

    // Elimina un producto de la lista usando su número de posición en el array
    deleteItem(index) {
        // Quitamos un elemento de la lista en la posición indicada
        this.items.splice(index, 1);
        // Guardamos los cambios para que se reflejen en el localStorage y en la vista
        this.save();
    }

    // Procesa la compra y limpia la lista
    buy() {
        // Si no hay productos, mostramos un aviso y no hacemos nada más
        if (this.items.length === 0) return alert("Cesta vacía");
        // Vaciamos la lista de productos por completo
        this.items = [];
        // Guardamos el estado vacío y lanzamos un alert
        this.save();
        alert("¡Gracias por su compra!");
    }

    // Actualiza el localStorage y vuelve a renderizar
    save() {
        // Guardamos los productos en el local storage
        localStorage.setItem("item-cart", JSON.stringify(this.items));
        // Actualizamos lo que el usuario ve en la pantalla
        this.render();
    }

    // Calcula la suma total de los precios de los productos
    calculateTotal() {
        // Recorremos la lista sumando cada precio y devolvemos el resultado con dos decimales
        return this.items.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    }

    // Renderizado de los productos
    render() {
        if (!this.container) return; // ✅ No hace nada si no hay contenedor
        if (this.items.length === 0) {
            return this.container.innerHTML = "<p>Tu cesta está vacía</p>";
        }
        // Si la lista está vacía, mostramos un mensaje informativo
        if (this.items.length === 0) {
            return this.container.innerHTML = "<p>Tu cesta está vacía</p>";
        }

        // Iniciamos la creación de la estructura visual
        let html = `<div class="cart-list">`;
        
        // Para cada producto añadimos el nombre, el precio y un botón para eliminarlo
        this.items.forEach((item, index) => {
            html += `
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                    <div style="flex:1;">
                        <span style="font-size:0.9rem; display:block; line-height:1.2;">${item.name}</span>
                        <strong>${item.price}€</strong>
                    </div>
                    <button class="btn-del" data-index="${index}" style="cursor:pointer; border:none; background:#ff4444; color:white; padding:5px 8px; border-radius:4px;">Eliminar</button>
                </div>`;// El index representa la posición del producto en la lista
        });

        // Añadimos la sección final con el precio total y el botón de finalizar compra
        html += `
            <div style="margin-top:15px;">
                <p style="text-align:right; font-size:1.2rem;"><strong>Total: ${this.calculateTotal()}€</strong></p>
                <button id="btn-buy-now" style="width:100%; background:#ff8800; color:white; border:none; padding:12px; cursor:pointer; border-radius:5px; font-weight:bold;">FINALIZAR COMPRA</button>
            </div>
        </div>`;

        // Insertamos todo el código generado dentro del contenedor del HTML
        this.container.innerHTML = html;

        // Asignamos la función de eliminar a cada botón rojo creado
        this.container.querySelectorAll(".btn-del").forEach(btn => {
            btn.onclick = () => this.deleteItem(btn.dataset.index);
        });

        // Asignamos la función de compra al botón correspondiente
        const btnBuy = document.getElementById("btn-buy-now");
        if (btnBuy) btnBuy.onclick = () => this.buy();
    }
}

// Creamos una única instancia del carrito para usarla en toda la aplicación
window.cartInstance = new Cart();