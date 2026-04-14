// DATA
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

const products = [
    { id: 1, name: 'Portátil Alurin Flex Advance AMD Ryzen 7-5825U 15.6"/16GB/500GB/Windows 11', image: "https://thumb.pccomponentes.com/w-530-530/articles/1082/10827754/1754-alurin-flex-advance-amd-ryzen-7-5825u-156-16gb-500gb-ssd-windows-11-home.jpg", price: 499.99, oldPrice: 644.99, discount: 22, rating: 4.2, reviews: 421, freeShipping: true, delivery: "Entrega mañana", colors: ["#C0C0C0", "#333"] },
    { id: 2, name: 'PcCom Revolt 5070 Intel Core i7-14650HX 16"/QHD/32GB/1TB/Windows 11 Home', image: "https://thumb.pccomponentes.com/w-530-530/articles/1091/10916735/1877-pccom-revolt-5070-intel-core-i7-14650hx-16-qhd-32gb-1tb-windows-11-home.jpg", price: 1819.99, oldPrice: 2079.99, discount: 12, rating: 4.4, reviews: 9, freeShipping: true, delivery: "Entrega mañana" },
    { id: 3, name: 'Portátil Lenovo IdeaPad Slim 3 15AMN8 15,6" AMD Ryzen 5 7520U 16GB 512GB SSD Azul', image: "https://thumb.pccomponentes.com/w-530-530/articles/1071/10719498/1631-lenovo-ideapad-slim-3-15amn8-amd-ryzen-5-7520u-16gb-512gb-ssd-156.jpg", price: 439, oldPrice: 499, discount: 12, rating: 4.9, reviews: 20, freeShipping: true, delivery: "Entrega mañana" },
    { id: 4, name: 'Portátil Lenovo Legion 5 15AHP10 15.1" AMD Ryzen 7 260 32GB 1TB SSD RTX 5060', image: "https://thumb.pccomponentes.com/w-530-530/articles/1091/10917459/1877-lenovo-legion-5-15ahp10-amd-ryzen-7-260-32gb-1tb-ssd-rtx-5060-151.jpg", price: 1299, oldPrice: 1699, discount: 23, rating: 4.7, reviews: 51, freeShipping: true, delivery: "Entrega a partir del jueves" },
    { id: 5, name: 'Acer Aspire Go 15 AG15-42P-R26T 15.6" AMD Ryzen 7 5825U 16GB 512GB SSD', image: "https://thumb.pccomponentes.com/w-530-530/articles/1085/10858498/1754-acer-aspire-go-15-ag15-42p-r26t-amd-ryzen-7-5825u-16gb-512gb-ssd-156.jpg", price: 469.99, oldPrice: 549, discount: 14, rating: 4.5, reviews: 208, freeShipping: true, delivery: "Entrega mañana", trending: true },
    { id: 6, name: 'ASUS TUF Gaming A15 FA507UV-LP023W 15.6" AMD Ryzen 7 8845HS 16GB 512GB SSD RTX 4060', image: "https://thumb.pccomponentes.com/w-530-530/articles/1087/10870395/1631-asus-tuf-gaming-a15-fa507uv-lp023w-amd-ryzen-7-8845hs-16gb-512gb-ssd-rtx-4060-156.jpg", price: 899, oldPrice: 1099, discount: 18, rating: 4.6, reviews: 134, freeShipping: true, delivery: "Entrega mañana" },
    { id: 7, name: 'HP Victus 16-s1011ns 16.1" AMD Ryzen 7 8845HS 32GB 1TB SSD RTX 4060', image: "https://thumb.pccomponentes.com/w-530-530/articles/1089/10891562/1877-hp-victus-16-s1011ns-amd-ryzen-7-8845hs-32gb-1tb-ssd-rtx-4060-161.jpg", price: 979, oldPrice: 1199, discount: 18, rating: 4.3, reviews: 67, freeShipping: true, delivery: "Entrega mañana", colors: ["#1a1a2e", "#f0f0f0"] },
    { id: 8, name: 'MSI Katana A17 AI B8VF-285XES 17.3" AMD Ryzen 7 8845HS 16GB 1TB SSD RTX 4060', image: "https://thumb.pccomponentes.com/w-530-530/articles/1090/10901234/1877-msi-katana-a17-ai-b8vf-285xes-amd-ryzen-7-8845hs-16gb-1tb-ssd-rtx-4060-173.jpg", price: 1049, oldPrice: 1299, discount: 19, rating: 4.4, reviews: 45, freeShipping: true, delivery: "Entrega mañana" },
    { id: 9, name: 'Lenovo IdeaPad 1 15AMN7 15.6" AMD Ryzen 5 7520U 8GB 256GB SSD', image: "https://thumb.pccomponentes.com/w-530-530/articles/1064/10644872/1631-lenovo-ideapad-1-15amn7-amd-ryzen-5-7520u-8gb-256gb-ssd-156.jpg", price: 329, oldPrice: 399, discount: 17, rating: 4.1, reviews: 312, freeShipping: true, delivery: "Entrega mañana" },
    { id: 10, name: 'ASUS Vivobook 15 X1504ZA-NJ921W 15.6" Intel Core i5-1235U 16GB 512GB SSD', image: "https://thumb.pccomponentes.com/w-530-530/articles/1078/10782345/1631-asus-vivobook-15-x1504za-nj921w-intel-core-i5-1235u-16gb-512gb-ssd-156.jpg", price: 479, oldPrice: 549, discount: 13, rating: 4.5, reviews: 189, freeShipping: true, delivery: "Entrega mañana" }
];

// RENDER CATEGORIES
document.getElementById("catCarousel").innerHTML = categories.map(c =>
    `<button class="cat-card">
        <div class="cat-icon">${c.icon}</div>
        <span>${c.label}</span>
    </button>`
).join("");

// RENDER SIDEBAR
document.getElementById("sidebar").innerHTML = filters.map((f, fi) => {
    let body = "";
    
    if (f.type === "price") {
        body = `
            <div class="price-inputs">
                <input type="number" placeholder="Desde">
                <span>–</span>
                <input type="number" placeholder="Hasta">
            </div>`;
    } else {
        const hasSearch = f.type === "search";
        const items = f.items || [];
        const max = f.max || items.length;
        const visible = items.slice(0, max);
        const hidden = items.slice(max);
        
        const searchInput = hasSearch 
            ? `<input class="filter-search" type="text" placeholder="Buscar..." oninput="filterItems(this, ${fi})">` 
            : "";
            
        const filterItemsHTML = `<div class="filter-items" data-fi="${fi}">
            ${items.map((it, ii) => `
                <label class="filter-item" data-text="${it.toLowerCase()}" style="${ii >= max ? 'display:none' : ''}">
                    <input type="checkbox">
                    <span>${it}</span>
                </label>
            `).join("")}
        </div>`;
        
        const showMoreBtn = hidden.length 
            ? `<button class="show-more" onclick="toggleMore(this, ${fi})">Ver más (${hidden.length})</button>` 
            : "";
            
        body = searchInput + filterItemsHTML + showMoreBtn;
    }
    
    return `
        <div class="filter-section">
            <div class="filter-title" onclick="toggleFilter(this)">
                ${f.title}
                <span class="arrow">▾</span>
            </div>
            <div class="filter-body">
                ${body}
            </div>
        </div>`;
}).join("");

// RENDER PRODUCTS
function fmt(n) {
    return n.toLocaleString("es-ES", { minimumFractionDigits: 2 });
}

document.getElementById("productGrid").innerHTML = products.map(p => {
    const badges = `
        ${p.discount ? `<span class="badge-discount">-${p.discount}%</span>` : ""}
        ${p.trending ? `<span class="badge-trending">Trending</span>` : ""}
    `;
    
    const colors = p.colors 
        ? `<div class="card-colors">
            ${p.colors.map(c => `<span class="color-dot" style="background:${c}"></span>`).join("")}
            <span>Ver otras opciones</span>
           </div>` 
        : "";
        
    const shipping = p.freeShipping 
        ? `<div class="card-shipping">
            <span class="free">🚚 Envío gratis.</span>
            <span class="delivery">${p.delivery}</span>
           </div>` 
        : "";
        
    return `
        <div class="product-card">
            ${badges}
            <div class="card-img">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
            </div>
            <div class="card-title">${p.name}</div>
            <div class="card-price">
                <span class="current">${fmt(p.price)}€</span>
                ${p.oldPrice ? `<span class="old">${fmt(p.oldPrice)}€</span>` : ""}
            </div>
            <div class="card-rating">
                <span>${p.rating}/5</span>
                <span class="star">★</span>
                <span class="reviews">${p.reviews} opiniones</span>
            </div>
            ${shipping}
            ${colors}
            <label class="card-compare">
                <input type="checkbox">Comparar
            </label>
        </div>`;
}).join("");

// JS INTERACTIONS
function toggleFilter(el) {
    const body = el.nextElementSibling;
    const arrow = el.querySelector(".arrow");
    body.classList.toggle("collapsed");
    arrow.classList.toggle("collapsed");
}

function toggleMore(btn, fi) {
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
}

function filterItems(input, fi) {
    const val = input.value.toLowerCase();
    const labels = input.parentElement.querySelectorAll(".filter-items label");
    
    labels.forEach(l => {
        l.style.display = l.dataset.text.includes(val) ? "" : "none";
    });
}