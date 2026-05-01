import ProductRenderer from "./components/ProductRenderer.js"; //Importa el componente ProductRenderer para renderizar los productos
import PcComService from "./services/PcComService.js"; //Importa el servicio PcComService para obtener los datos de los productos
const seleccionTopCarrusel = document.getElementById("seleccion-top-carrusel"); //Referencia a el carrusel de la seleccion top
const basadoNavegacionCarrusel = document.getElementById("basado-navegacion-carrusel"); //Referencia a el carrusel de basado en tu navegación
const masVendidoGrid = document.getElementById("mas-vendido-grid"); //Referencia a el grid de descubre los productos más vendidos

let articleList = [];

//4. Renderiza los datos del JSON
function renderArticles(articlesJSON) {
    //Renderiza los primeros 12 articulos en la seleccion top
    ProductRenderer.render12Articles(seleccionTopCarrusel, articlesJSON);
    //Renderiza los primeros 12 articulos en basado en tu navegación
    ProductRenderer.render12Articles(basadoNavegacionCarrusel, articlesJSON);
    //Renderiza los primeros 12 articulos en los productos más vendidos
    ProductRenderer.render12Articles(masVendidoGrid, articlesJSON);
}

//2. Llama a la funcion para cargar el JSON y luego lo renderizamos
async function init() {
    articleList = await PcComService.getArticles();//3. Recibe los datos del json
    console.log(articleList); //Envia a la consola la información recibida para comprobar que funciona correctamente
    renderArticles(articleList);
}

//1. Inicio
init();