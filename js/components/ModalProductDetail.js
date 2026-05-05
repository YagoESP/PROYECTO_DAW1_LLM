export default class ModalProductDetail {

    // Función para abrir el modal con la información del producto
    static openModal(card) {
        console.log("Card clicada:", card);
        const data = card.dataset;
        const modalDetalle = document.getElementById("modal-detail");
        const productDetail = document.getElementById("product-detail");
        const btnCloseModal = document.getElementById("btn-close-modal");
        const addToCartBtn = document.getElementById("add-to-cart");

        if (parseFloat(data.discount) > 0) {
            productDetail.innerHTML = this.renderDiscountedProductDetail(data);
        } else {
            productDetail.innerHTML = this.renderProductDetail(data);
        }


        modalDetalle.showModal();// Abre el modal utilizando el método showModal() del elemento <dialog>
        //modalDetalle.style.display = "block";
        btnCloseModal.addEventListener("click", () => {
            modalDetalle.close(); // Cierra el modal utilizando el método close() del elemento <dialog>
            //modalDetalle.style.display = "none";
        });
        addToCartBtn.onclick = () => {
            // Calculamos el precio según si hay descuento o no
            let precioFinal = data.price;
            if (parseFloat(data.discount) > 0) { // Si el descuento es mayor que cero calcula el precio final
                precioFinal = this.calcularPrecioConDescuento(data.price, data.discount);
            }

            // Llamamos a la cesta global y le pasamos los datos reales del producto actual
            window.cartInstance.add({
                name: data.name,
                price: precioFinal
            });

            // Cerramos el modal tras añadir
            modalDetalle.close();
        };
    }

    static renderProductDetail(data) {
        return `
            <div>
                <img src="./images/products/${data.id}.webp" alt="imagen del producto" class="product-image">
            </div>
            <div>
                <h2>${data.name}</h2>
                <p>${data.description}</p>
                <div class="product-price">
                    <p class="current-price">Precio: ${data.price}€</p>
                </div>
            </div>
        `;
    }
    static renderDiscountedProductDetail(data) {
        return `
            <div>
                <span class="discount-badge">${(data.discount * 100).toFixed(0)}%</span>
                <img src="./images/products/${data.id}.webp" alt="imagen del producto" class="product-image">
            </div>
            <div>
                <h2>${data.name}</h2>
                <p>${data.description}</p>
                <div class="product-price">
                    <p class="current-price">Precio: ${this.calcularPrecioConDescuento(data.price, data.discount)}€</p>
                    <p class="old-price">Precio anterior: ${data.price}€</p>
                </div>
            </div>
        `;
    }

    // Calculamos el precio descontado
    static calcularPrecioConDescuento(precio, porcentaje) {
        const descuento = precio * (porcentaje);
        let total = precio - descuento
        total = Math.round(total * 100) / 100;
        return total;
    }
}