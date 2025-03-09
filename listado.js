document.addEventListener("DOMContentLoaded", () => {
    obtenerElementos(elementos => {
        const tabla = document.querySelector("#listado-elementos tbody");
        tabla.innerHTML = "";
        elementos.forEach(e => {
            tabla.innerHTML += `<tr><td>${e.nombre}</td><td>${e.ubicacion}</td><td>${e.cantidad}</td></tr>`;
        });
    });

    obtenerUbicaciones(ubicaciones => {
        const tabla = document.querySelector("#listado-ubicaciones tbody");
        tabla.innerHTML = "";
        ubicaciones.forEach(u => {
            let elementosUbicacion = [];
            obtenerElementos(elementos => {
                elementos.forEach(e => {
                    if (e.ubicacion === u.nombre) {
                        elementosUbicacion.push(`${e.nombre} (${e.cantidad})`);
                    }
                });
                tabla.innerHTML += `<tr><td>${u.nombre}</td><td>${elementosUbicacion.join(", ") || "Vacío"}</td></tr>`;
            });
        });
    });
});
