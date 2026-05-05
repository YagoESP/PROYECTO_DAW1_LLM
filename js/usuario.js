// Dirección de tu servidor (Laravel)
const URL_API = "http://localhost:8000/api";

const UsuarioService = {
    // Función para guardar la sesión y volver a la página principal
    irAlInicio(datos) {
        localStorage.setItem("usuario_sesion", JSON.stringify(datos));
        // Salimos de tienda/login/ para llegar a la raíz donde está index.html
        window.location.href = "../../index.html";
    },

    // Función para Iniciar Sesión
    async login(email, password) {
        try {
            const respuesta = await fetch(`${URL_API}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (respuesta.status === 404) return alert("La cuenta no existe.");
            if (respuesta.ok) this.irAlInicio(await respuesta.json());
        } catch (e) { alert("Error: El servidor no responde."); }
    },

    // Función para Crear Cuenta
    async registro(nombre, email, password) {
        try {
            const respuesta = await fetch(`${URL_API}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: nombre, email: email, password: password })
            });
            if (respuesta.status === 422 || respuesta.status === 409) return alert("Esta cuenta ya existe.");
            if (respuesta.ok) {
                alert("¡Cuenta creada!");
                this.irAlInicio(await respuesta.json());
            }
        } catch (e) { alert("Error: El servidor no responde."); }
    }
};

// Escuchamos los clics en toda la pantalla
document.addEventListener("click", function(event) {
    const elemento = event.target;

    // Si el botón está dentro de un enlace <a> (como el botón para cambiar de página), NO HACEMOS NADA
    if (elemento.closest("a")) return;

    // LÓGICA PARA CREAR CUENTA (Botón con clase btn-create)
    if (elemento.classList.contains("btn-create")) {
        // ESTA LÍNEA ES VITAL: Evita que la página se recargue/use GET
        event.preventDefault(); 
        event.stopPropagation();

        console.log("Botón pulsado, deteniendo recarga...");

        const inputs = document.querySelectorAll("input");
        const n = inputs[0]?.value;
        const e = inputs[1]?.value;
        const p = inputs[2]?.value;

        if (n && e && p) {
            UsuarioService.registro(n, e, p);
        } else {
            alert("Faltan campos");
        }
    }

    // LÓGICA PARA INICIAR SESIÓN (Botón con clase btn-login)
    if (elemento.classList.contains("btn-login")) {
        event.preventDefault();
        // Buscamos los inputs de la página de login
        const inputs = document.querySelectorAll("input");
        // Según tu HTML: 0=Email, 1=Contraseña
        const e = inputs[0]?.value;
        const p = inputs[1]?.value;

        if (e && p) {
            UsuarioService.login(e, p);
        } else {
            alert("Escribe tu email y contraseña.");
        }
    }
});