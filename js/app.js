const productsCarrusel = document.getElementById("products-carrusel");

let articleList = [];

//3. Recibe los datos del json
async function getArticles() {
    const response = await fetch('./data/articles.json'); //La direccion no parte de este archivo, parte del index html que estará cargando este fichero
    const data = await response.json();
    return data;
}

//4. Renderiza los datos del JSON
function renderArticles(articlesJSON) {
    productsCarrusel.innerHTML = "";
    articlesJSON.slice(0, 12).forEach(article => {
        productsCarrusel.innerHTML += `
            <article class="product-card"><!--Esta es una de las cards para los productos-->
                <div><!--Contenedor para la imagen-->
                    <span class="discount-badge">30%</span><!--Etiqueta con el % de descuento  que se superpone a la imagen-->
                    <img src=${article.image} alt="imagen del producto" class="product-image">
                        <span>Trending</span><!--Etiqueta de tendencia, no aparece en todos los productos-->
                </div>
                <div><!--Contenedor para la informacion-->
                    <p class="product-title">${article.name}</p>
                    <div class="product-price"><!--Contenedor para los precios-->
                        <p class="current-price">${article.price}€</p><!--Precio con descuento ya aplicado-->
                        <p class="old-price">${article.oldPrice}€</p>
                    </div>
                    <span>¡Precio mínimmo histórico!</span><!--No aparece en todos los productos-->
                    <div class="contenedor-valoracion"><!--Contenedor para las valoraciones-->
                        <span>${article.rating}</span><br>
                            <span>10 opiniones</span>
                    </div>
                    <!--Estas lineas de abajo aparecen en todos los productos menos losde Selección TOP-->
                    <span>Envío gratis. Entrega mañana</span>
                    <p>Ver otras opciones</p>
                    <!--Normalmente muestra las opciones de color a la izquierda, NO está en todos los productos-->
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