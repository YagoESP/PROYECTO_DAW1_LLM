import PcComService from "./services/PcComService.js";
import ProductRenderer from "./components/ProductRenderer.js";
import ModalProductDetail from "./components/ModalProductDetailFilter.js";


// ── DATA ESTÁTICA ────────────────────────────────────────────────
const categories = [
    { icon: "🎮", label: "Gaming" },
    { icon: "🖥️", label: "Gaming avanzado" },
    { icon: "🎓", label: "Perfectos para estudiantes" },
    { icon: "💼", label: "Para uso profesional" },
    { icon: "🎨", label: "Diseño gráfico y edición" },
    { icon: "💻", label: "Básicos hasta 500€" },
    { icon: "🪟", label: "con Windows 11 Home" },
    { icon: "🪟", label: "con Windows 11 Pro" },
    { icon: "🍎", label: "MacBook" },
    { icon: "♻️", label: "Reacondicionados gaming" }
];


const filters = [
    { title: "Precio", type: "price" },
    { title: "Marca", type: "search", items: ["Acer (423)", "Apple (89)", "ASUS (567)", "HP (612)", "Huawei (98)", "Lenovo (734)", "Microsoft (45)", "MSI (312)", "Samsung (123)", "Toshiba (34)"], max: 5 },
    { title: "RAM", type: "list", items: ["4 GB (89)", "8 GB (734)", "16 GB (1245)", "32 GB (567)", "64 GB (123)"] },
    { title: "Tamaño de pantalla", type: "list", items: ['13" (234)', '14" (456)', '15.6" (1567)', '16" (345)', '17.3" (234)'] },
    { title: "Procesador", type: "search", items: ["AMD Ryzen 5 (567)", "AMD Ryzen 7 (489)", "AMD Ryzen 9 (123)", "Intel Core i5 (612)", "Intel Core i7 (534)", "Intel Core i9 (89)", "Apple M2 (45)", "Apple M3 (34)"], max: 5 },
    { title: "Disco duro", type: "list", items: ["256 GB SSD (423)", "512 GB SSD (1234)", "1 TB SSD (567)", "2 TB SSD (89)"] },
    { title: "Sistema operativo", type: "list", items: ["Windows 11 Home (1567)", "Windows 11 Pro (456)", "macOS (89)", "Sin SO (234)", "Chrome OS (67)"] }
];


// ── ESTADO GLOBAL ────────────────────────────────────────────────
let allProducts = [];
let filteredProducts = [];


// ── RENDER CATEGORÍAS ────────────────────────────────────────────
document.getElementById("catCarousel").innerHTML = categories.map(c => `
    <button class="cat-card" onclick="filterByCategory('${c.label}', this)">
        <div class="cat-icon">${c.icon}</div>
        <span>${c.label}</span>
    </button>`
).join("");


// ── RENDER SIDEBAR ───────────────────────────────────────────────
document.getElementById("sidebar").innerHTML = filters.map((f, fi) => {
    let body = "";

    if (f.type === "price") {
        body = `
            <div class="price-inputs">
                <input type="number" id="price-min" placeholder="Desde" oninput="applyFilters()">
                <span>–</span>
                <input type="number" id="price-max" placeholder="Hasta" oninput="applyFilters()">
            </div>`;
    } else {
        const hasSearch = f.type === "search";
        const items = f.items || [];
        const max = f.max || items.length;

        const searchInput = hasSearch
            ? `<input class="filter-search" type="text" placeholder="Buscar..." oninput="filterItems(this, ${fi})">`
            : "";

        const filterItemsHTML = `
            <div class="filter-items" data-fi="${fi}">
                ${items.map((it, ii) => `
                    <label class="filter-item" data-text="${it.toLowerCase()}" style="${ii >= max ? 'display:none' : ''}">
                        <input type="checkbox" onchange="applyFilters()">
                        <span>${it}</span>
                    </label>`
        ).join("")}
            </div>`;

        const showMoreBtn = items.length > max
            ? `<button class="show-more" onclick="toggleMore(this, ${fi})">Ver más (${items.length - max})</button>`
            : "";

        body = searchInput + filterItemsHTML + showMoreBtn;
    }

    return `
        <div class="filter-section">
            <div class="filter-title" onclick="toggleFilter(this)">
                ${f.title}
                <span class="arrow">▾</span>
            </div>
            <div class="filter-body">${body}</div>
        </div>`;
}).join("");


// ── RENDER PRODUCTOS ─────────────────────────────────────────────
function fmt(n) {
    return parseFloat(n).toLocaleString("es-ES", { minimumFractionDigits: 2 });
}


function renderProducts(products) {
    const grid = document.getElementById("productGrid");
    document.querySelector(".count").textContent = `${products.length} artículos`;

    if (products.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <p>😕 No se han encontrado productos con estos filtros.</p>
                <button onclick="resetFilters()">Limpiar filtros</button>
            </div>`;
        return;
    }

    grid.innerHTML = products.map(p => {
        const discountPercent = p.discount > 0 ? Math.round(p.discount * 100) : 0;
        const precioFinal = p.discount > 0
            ? Math.round(p.price * (1 - p.discount) * 100) / 100
            : p.price;

        return `
            <article class="product-card"
                data-id="${p.id}"
                data-name="${p.name}"
                data-description="${p.description ?? ''}"
                data-price="${p.price}"
                data-discount="${p.discount ?? 0}">
                
                ${discountPercent > 0
                ? `<span class="badge-discount">-${discountPercent}%</span>`
                : ""}

                <div class="card-img">
                    <img src="../images/products/${p.id}.webp"
                         alt="${p.name}"
                         loading="lazy"
                         onerror="this.src='../images/portatil_placeholder.webp'">
                </div>

                <p class="card-title">${p.name}</p>

                <div class="card-price">
                    <span class="current">${fmt(precioFinal)}€</span>
                    ${discountPercent > 0 ? `<span class="old">${fmt(p.price)}€</span>` : ""}
                </div>

                <div class="card-shipping">
                    <span class="free"> Envío gratis.</span>
                </div>

                
            </article>`;
    }).join("");

    // Clic en card → abre modal detalle (ignora clic en comparar)
    grid.onclick = (e) => {
        if (e.target.closest(".card-compare")) return;
        const card = e.target.closest(".product-card");
        if (card) ModalProductDetail.openModal(card);
    };
}


// ── LÓGICA DE FILTROS ────────────────────────────────────────────
function applyFilters() {
    const minPrice = parseFloat(document.getElementById("price-min")?.value) || 0;
    const maxPrice = parseFloat(document.getElementById("price-max")?.value) || Infinity;

    const checkedByGroup = {};
    document.querySelectorAll(".filter-items").forEach(container => {
        const fi = container.dataset.fi;
        const checked = [...container.querySelectorAll("input[type=checkbox]:checked")]
            .map(cb => cb.parentElement.querySelector("span").textContent.toLowerCase());
        if (checked.length) checkedByGroup[fi] = checked;
    });

    filteredProducts = allProducts.filter(p => {
        const precioFinal = p.discount > 0
            ? Math.round(p.price * (1 - p.discount) * 100) / 100
            : p.price;
        if (precioFinal < minPrice || precioFinal > maxPrice) return false;

        for (const fi in checkedByGroup) {
            const grupo = checkedByGroup[fi];
            const nombreProducto = p.name.toLowerCase();
            const coincide = grupo.some(opcion => {
                const etiqueta = opcion.replace(/\s*\(\d+\)$/, "").trim();
                return nombreProducto.includes(etiqueta);
            });
            if (!coincide) return false;
        }

        return true;
    });

    renderProducts(filteredProducts);
}


function resetFilters() {
    document.querySelectorAll(".filter-items input[type=checkbox]").forEach(cb => cb.checked = false);
    const min = document.getElementById("price-min");
    const max = document.getElementById("price-max");
    if (min) min.value = "";
    if (max) max.value = "";
    filteredProducts = [...allProducts];
    renderProducts(filteredProducts);
}


// ── INTERACCIONES SIDEBAR ────────────────────────────────────────
window.toggleFilter = function (el) {
    el.nextElementSibling.classList.toggle("collapsed");
    el.querySelector(".arrow").classList.toggle("collapsed");
};


window.toggleMore = function (btn, fi) {
    const container = btn.parentElement.querySelector(".filter-items");
    const hidden = container.querySelectorAll("label[style*='display:none']");
    if (hidden.length) {
        hidden.forEach(l => l.style.display = "");
        btn.textContent = "Ver menos";
    } else {
        const max = filters[fi].max || 5;
        container.querySelectorAll("label").forEach((l, i) => {
            if (i >= max) l.style.display = "none";
        });
        btn.textContent = `Ver más (${container.querySelectorAll("label").length - max})`;
    }
};


window.filterItems = function (input, fi) {
    const val = input.value.toLowerCase();
    input.parentElement.querySelectorAll(".filter-items label").forEach(l => {
        l.style.display = l.dataset.text.includes(val) ? "" : "none";
    });
};


window.applyFilters = applyFilters;
window.resetFilters = resetFilters;


// ── ORDENACIÓN ───────────────────────────────────────────────────
document.getElementById("sortSelect").addEventListener("change", (e) => {
    const valor = e.target.value;
    let sorted = [...filteredProducts];
    if (valor === "precio-asc") sorted.sort((a, b) => a.price - b.price);
    if (valor === "precio-desc") sorted.sort((a, b) => b.price - a.price);
    if (valor === "descuento") sorted.sort((a, b) => b.discount - a.discount);
    if (valor === "nombre") sorted.sort((a, b) => a.name.localeCompare(b.name));
    renderProducts(sorted);
});


// ── CATEGORÍAS CON FILTRADO ──────────────────────────────────────
window.filterByCategory = function (label, btn) {
    const yaActivo = btn.classList.contains("active");
    document.querySelectorAll(".cat-card").forEach(b => b.classList.remove("active"));

    if (yaActivo) {
        filteredProducts = [...allProducts];
        renderProducts(filteredProducts);
        return;
    }

    btn.classList.add("active");
    const keyword = label.toLowerCase();
    const categoryMap = {
        "gaming": ["gaming", "rtx", "ryzen 7", "ryzen 9", "i7", "i9"],
        "gaming avanzado": ["rtx 4070", "rtx 4080", "rtx 4090", "rtx 5070", "rtx 5080"],
        "perfectos para estudiantes": ["ryzen 5", "i5", "8gb", "256gb"],
        "para uso profesional": ["i7", "i9", "ryzen 9", "32gb", "workstation"],
        "diseño gráfico y edición": ["rtx", "32gb", "oled", "adobe"],
        "con windows 11 home": ["windows 11 home"],
        "con windows 11 pro": ["windows 11 pro"],
        "macbook": ["apple", "macbook", "m2", "m3"],
        "reacondicionados gaming": ["reacondicionado", "gaming"],
    };

    if (label === "Básicos hasta 500€") {
        filteredProducts = allProducts.filter(p => {
            const precio = p.discount > 0 ? p.price * (1 - p.discount) : p.price;
            return precio <= 500;
        });
    } else {
        const keywords = categoryMap[keyword] || [keyword];
        filteredProducts = allProducts.filter(p =>
            keywords.some(kw => p.name.toLowerCase().includes(kw))
        );
    }

    renderProducts(filteredProducts);
};


// ── CARGA INICIAL ────────────────────────────────────────────────
async function init() {
    const loading = document.getElementById("loadingState");
    try {
        allProducts = await PcComService.getArticles();
        filteredProducts = [...allProducts];
        loading.style.display = "none";
        renderProducts(filteredProducts);
    } catch (error) {
        console.error("Error cargando productos:", error);
        loading.innerHTML = `
            <p>No se pudo conectar con la API.</p>
            <p>Asegúrate de que <strong>php artisan serve</strong> está activo.</p>`;
    }
}


init();