document.addEventListener("DOMContentLoaded", function() {
    if (!window.indexedDB) {
        console.error("IndexedDB no es compatible con este navegador.");
        return;
    }

    let request = indexedDB.open("almacenDB", 1);
    request.onsuccess = event => {
        db = event.target.result;
        actualizarListas();
        agregarEventos();
    };

    request.onerror = event => {
        console.error("Error al abrir la base de datos", event.target.errorCode);
    };
});

function agregarEventos() {
    document.getElementById("agregar-ubicacion").addEventListener("click", function() {
        const nombre = document.getElementById("ubicacion-nombre").value.trim();
        const comentarios = document.getElementById("ubicacion-comentarios").value.trim();
        if (nombre) {
            agregarUbicacion(nombre, comentarios);
        }
    });

    document.getElementById("agregar-elemento").addEventListener("click", function() {
        const nombre = document.getElementById("elemento-nombre").value.trim();
        const ubicacion = document.getElementById("elemento-ubicacion").value;
        const cantidad = parseInt(document.getElementById("elemento-cantidad").value) || 0;
        if (nombre && cantidad >= 0) {
            agregarElemento(nombre, ubicacion, cantidad);
        }
    });
}

function actualizarListas() {
    if (!db) return;

    obtenerUbicaciones(ubicaciones => {
        const selectUbicacion = document.getElementById("elemento-ubicacion");
        const tablaUbicaciones = document.querySelector("#tabla-ubicaciones tbody");

        if (selectUbicacion && tablaUbicaciones) {
            selectUbicacion.innerHTML = '<option value="sin ubicacion">Sin Ubicación</option>';
            tablaUbicaciones.innerHTML = "";

            ubicaciones.forEach(u => {
                selectUbicacion.innerHTML += `<option value="${u.nombre}">${u.nombre}</option>`;
                tablaUbicaciones.innerHTML += `<tr><td>${u.nombre}</td><td>${u.comentarios}</td><td><button onclick="eliminarUbicacion(${u.id})">Eliminar</button></td></tr>`;
            });
        }
    });

    obtenerElementos(elementos => {
        const tablaElementos = document.querySelector("#tabla-elementos tbody");
        if (tablaElementos) {
            tablaElementos.innerHTML = "";
            elementos.forEach(e => {
                tablaElementos.innerHTML += `<tr><td>${e.nombre}</td><td>${e.ubicacion}</td><td>${e.cantidad}</td><td><button onclick="eliminarElemento(${e.id})">Eliminar</button></td></tr>`;
            });
        }
    });
}
