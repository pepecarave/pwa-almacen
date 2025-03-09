document.addEventListener("DOMContentLoaded", function() {
    actualizarListas();

    document.getElementById("agregar-ubicacion").addEventListener("click", function() {
        const nombre = document.getElementById("ubicacion-nombre").value;
        const comentarios = document.getElementById("ubicacion-comentarios").value;
        if (nombre) {
            agregarUbicacion(nombre, comentarios);
            actualizarListas();
        }
    });

    document.getElementById("agregar-elemento").addEventListener("click", function() {
        const nombre = document.getElementById("elemento-nombre").value;
        const ubicacion = document.getElementById("elemento-ubicacion").value;
        const cantidad = parseInt(document.getElementById("elemento-cantidad").value) || 0;
        if (nombre && cantidad >= 0) {
            agregarElemento(nombre, ubicacion, cantidad);
            actualizarListas();
        }
    });
});

function actualizarListas() {
    obtenerUbicaciones(ubicaciones => {
        const selectUbicacion = document.getElementById("elemento-ubicacion");
        selectUbicacion.innerHTML = '<option value="sin ubicacion">Sin Ubicación</option>';
        const tablaUbicaciones = document.querySelector("#tabla-ubicaciones tbody");
        tablaUbicaciones.innerHTML = "";
        ubicaciones.forEach(u => {
            selectUbicacion.innerHTML += `<option value="${u.nombre}">${u.nombre}</option>`;
            tablaUbicaciones.innerHTML += `<tr><td>${u.nombre}</td><td>${u.comentarios}</td><td><button onclick="eliminarUbicacion(${u.id})">Eliminar</button></td></tr>`;
        });
    });

    obtenerElementos(elementos => {
        const tablaElementos = document.querySelector("#tabla-elementos tbody");
        tablaElementos.innerHTML = "";
        elementos.forEach(e => {
            tablaElementos.innerHTML += `<tr><td>${e.nombre}</td><td>${e.ubicacion}</td><td>${e.cantidad}</td><td><button onclick="eliminarElemento(${e.id})">Eliminar</button></td></tr>`;
        });
    });
}
