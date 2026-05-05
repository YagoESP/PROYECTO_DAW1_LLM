import ProductRenderer from "./components/ProductRenderer.js"; //Importa el componente ProductRenderer para renderizar los productos
import PcComService from "./services/PcComService.js"; //Importa el servicio PcComService para obtener los datos de los productos
const seleccionTopCarrusel = document.getElementById("seleccion-top-carrusel"); //Referencia a el carrusel de la seleccion top
const basadoNavegacionCarrusel = document.getElementById("basado-navegacion-carrusel"); //Referencia a el carrusel de basado en tu navegación
const masBaratosCarrusel = document.getElementById("mas-baratos-carrusel"); //Referencia a el carrusel de descubre los productos más baratos
const masVendidoGrid = document.getElementById("mas-descuento-grid"); //Referencia a el grid de descubre los productos más vendidos

let articleList = [];
let categoryList = [];

//4. Renderiza los datos del JSON
function renderArticles(articlesJSON, categoriesJSON) {
    //Renderiza los primeros 12 articulos en basado en tu navegación
    ProductRenderer.render12Articles(basadoNavegacionCarrusel, articlesJSON);

    //Renderiza los primeros 12 articulos con descuento mas alto
    const sortedArticlesByPrice = [...articlesJSON].sort((a, b) => a.price - b.price); //Ordena los artículos por precio de menor a mayor
    ProductRenderer.render12Articles(masBaratosCarrusel, sortedArticlesByPrice);

    //Renderiza los primeros 12 articulos en la seleccion top
    ProductRenderer.render12Articles(seleccionTopCarrusel, articlesJSON);
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const parentId = Number(btn.dataset.category);
            const validCategoryIds = categoryList
                .filter(cat => cat.parent_category_id === parentId)
                .map(cat => cat.id);
            const filteredArticles = articlesJSON.filter(article => validCategoryIds.includes(article.category_id));
            console.log(filteredArticles);
            ProductRenderer.render12Articles(seleccionTopCarrusel, filteredArticles);
        });
    });

    //Renderiza los primeros 12 articulos con descuento mas alto
    const sortedArticlesByDiscount = [...articlesJSON].sort((a, b) => b.discount - a.discount); //Ordena los artículos por descuento de mayor a menor
    ProductRenderer.render12Articles(masVendidoGrid, sortedArticlesByDiscount);
}

//2. Llama a la funcion para cargar el JSON y luego lo renderizamos
async function init() {
    articleList = await PcComService.getArticles();//3. Recibe los datos del json
    categoryList = await PcComService.getCategories();
    renderArticles(articleList, categoryList);
}

//1. Inicio
init();