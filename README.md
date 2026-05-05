# PC Componentes - Clon 

![/images/logo-llm.png](https://github.com/YagoESP/PROYECTO_DAW1_LLM)

Este proyecto es una imitación de la tienda de informática PcComponentes, desarrollado como práctica colaborativa para el primer año del Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web.

## Descripción
El objetivo principal es aplicar los conocimientos de desarrollo web creando una plataforma funcional. Se ha diseñado una interfaz responsiva que simula la tienda original, incluyendo el catálogo y el simulacro de compra.

## Características Principales
- Incluye un catálogo de productos con visualización de componentes por categorías.
- El carrito de compras utiliza lógica en JavaScript para añadir artículos y sumar totales.
- La interfaz cuenta con diseño responsivo adaptado a móviles mediante CSS Flexbox y Grid.

## Tecnologías Utilizadas
- El frontend está desarrollado íntegramente con HTML5, CSS3 y JavaScript.
- Todo el control de versiones se ha gestionado a través de Git y GitHub.

## Instalación y Uso Local
- Clona el repositorio en tu máquina local:
  
   git clone https://github.com/YagoESP/PROYECTO_DAW1_LLM.git

## Como tener la API para tu PC
Tienes que tener XAMPP.

Importa en XAMPP la base de datos del archivo `pccomponentes.sql`:
1. Desde XAMPP control panel, en la fila de MySQL dale a `admin`.
2. Crear una base de datos vacía con el nombre `pccomponentes`.
3. Selecciona la nuva base de datos y cuando te asegures de estar dentro selecciona importar y elige el archivo `pccomponentes.sql`.

Con esto si teneis el MySQL de XAMPP configurado en el puerto `3307` como hicimos en clase ya os debería funcionar.

Para ponerla en marcha teneis que abrir un terminal sobre la carpeta `api-pccomponentes` y ejecutar `php artisan serve`.

Podeis utilizar `http://localhost:8000/api/products` para ver el listado de productos.

## Endpoints (CRUD)

Los endpoints devuelven y escuchan JSON en `http://localhost/api/\\\*`:

### Categories

* `GET /api/categories` - Fetch todas categories.
* `POST /api/categories` - Create una nueva category.
* `GET /api/categories/{category}` - View category.
* `PUT/PATCH /api/categories/{category}` - Update category.
* `DELETE /api/categories/{category}` - Delete category.

### Products

* `GET /api/products` - Fetch todos los products (incluida la `description`).
* `POST /api/products` - Create un product.
* `GET /api/products/{product}` - View  product.
* `PUT/PATCH /api/products/{product}` - Update product.
* `DELETE /api/products/{product}` - Delete product.

### Customers

* `GET /api/customers` - Fetch todos los customers.
* `POST /api/customers` - Registra a un customer (oculta la contraseña).
* `GET /api/customers/{customer}` - View Customer.
* `PUT/PATCH /api/customers/{customer}` - Update customer.
* `DELETE /api/customers/{customer}` - Remove customer.

### Carts \& CartItems

* Use identical paths `.../api/carts` and `.../api/cart-items`.
