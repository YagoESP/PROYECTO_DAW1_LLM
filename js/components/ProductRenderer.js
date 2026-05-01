export default class ProductRenderer {

    static render12Articles(seccion, articlesJSON) {
        seccion.innerHTML = "";
        articlesJSON.slice(0, 12).forEach(article => {
            seccion.innerHTML += `
            <article class="product-card"><!--Esta es una de las cards para los productos-->
                <div><!--Contenedor para la imagen-->
                    <span class="discount-badge">${(article.discount * 100).toFixed(0)}%</span><!--Etiqueta con el % de descuento  que se superpone a la imagen-->
                    <img src="./images/products/${article.id}.webp" alt="imagen del producto" class="product-image">
                </div>
                <div><!--Contenedor para la informacion-->
                    <p class="product-title">${article.name}</p>
                    <div class="product-price"><!--Contenedor para los precios-->
                        <span class="current-price">${this.calcularPrecioConDescuento(article.price, article.discount)}€</span><!--Precio con descuento ya aplicado-->
                        <span class="old-price">${article.price}€</span>
                    </div>
                </div>
            </article>
        `;
        });
    }

    // Calculamos el precio descontado
    static calcularPrecioConDescuento(precio, porcentaje) {
        const descuento = precio * (porcentaje);
        let total = precio - descuento
        total = Math.round(total * 100) / 100;
        return total;
    }
}
