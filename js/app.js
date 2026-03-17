const seleccionTopCarrusel = document.getElementById("seleccion-top-carrusel"); //Referencia a el carrusel de la seleccion top
const basadoNavegacionCarrusel = document.getElementById("basado-navegacion-carrusel"); //Referencia a el carrusel de basado en tu navegación
const masVendidoGrid = document.getElementById("mas-vendido-grid"); //Referencia a el grid de descubre los productos más vendidos

let articleList = [];

//3. Recibe los datos del json
async function getArticles() {
    const response = await fetch('./data/articles.json'); //La direccion no parte de este archivo, parte del index html que estará cargando este fichero
    const data = await response.json();
    return data;
}

//4. Renderiza los datos del JSON
function renderArticles(articlesJSON) {
    //Renderiza los primeros 12 articulos en la seleccion top
    seleccionTopCarrusel.innerHTML = "";
    articlesJSON.slice(0, 12).forEach(article => {
        seleccionTopCarrusel.innerHTML += `
            <article class="product-card"><!--Esta es una de las cards para los productos-->
                <div><!--Contenedor para la imagen-->
                    <span class="discount-badge">30%</span><!--Etiqueta con el % de descuento  que se superpone a la imagen-->
                    <img src=${article.image} alt="imagen del producto" class="product-image">
                </div>
                <div><!--Contenedor para la informacion-->
                    <p class="product-title">${article.name}</p>
                    <div class="product-price"><!--Contenedor para los precios-->
                        <p class="current-price">${article.price}€</p><!--Precio con descuento ya aplicado-->
                        <p class="old-price">${article.oldPrice}€</p>
                    </div>
                </div>
            </article>
        `;
    });
    //Renderiza los primeros 12 articulos en basado en tu navegación
    basadoNavegacionCarrusel.innerHTML = "";
    articlesJSON.slice(0, 12).forEach(article => {
        basadoNavegacionCarrusel.innerHTML += `
            <article class="product-card"><!--Esta es una de las cards para los productos-->
                <div><!--Contenedor para la imagen-->
                    <span class="discount-badge">30%</span><!--Etiqueta con el % de descuento  que se superpone a la imagen-->
                    <img src=${article.image} alt="imagen del producto" class="product-image">
                </div>
                <div><!--Contenedor para la informacion-->
                    <p class="product-title">${article.name}</p>
                    <div class="product-price"><!--Contenedor para los precios-->
                        <p class="current-price">${article.price}€</p><!--Precio con descuento ya aplicado-->
                        <p class="old-price">${article.oldPrice}€</p>
                    </div>
                </div>
            </article>
        `;
    });
    //Renderiza los primeros 12 articulos en los productos más vendidos
    masVendidoGrid.innerHTML = "";
    articlesJSON.slice(0, 12).forEach(article => {
        masVendidoGrid.innerHTML += `
            <article class="product-card"><!--Esta es una de las cards para los productos-->
                <div><!--Contenedor para la imagen-->
                    <span class="discount-badge">30%</span><!--Etiqueta con el % de descuento  que se superpone a la imagen-->
                    <img src=${article.image} alt="imagen del producto" class="product-image">
                </div>
                <div><!--Contenedor para la informacion-->
                    <p class="product-title">${article.name}</p>
                    <div class="product-price"><!--Contenedor para los precios-->
                        <p class="current-price">${article.price}€</p><!--Precio con descuento ya aplicado-->
                        <p class="old-price">${article.oldPrice}€</p>
                    </div>
                </div>
            </article>
        `;
    });
}

//2. Llama a la funcion para cargar el JSON y luego lo renderizamos
async function init() {
    articleList = await getArticles();
    console.log(articleList); //Envia a la consola la información recibida para comprobar que funciona correctamente
    renderArticles(articleList);
}

//1. Inicio
init();