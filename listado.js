document.addEventListener("DOMContentLoaded", function() {
    let request = indexedDB.open("almacenDB", 1);

    request.onsuccess = function(event) {
        db = event.target.result;
        cargarListadoElementos();
        cargarListadoUbicaciones();
    };

    request.onerror = function(event) {
        console.error("Error al abrir IndexedDB:", event.target.errorCode);
    };
});

function cargarListadoElementos() {
    let transaction = db.transaction(["elementos"], "readonly");
    let store = transaction.objectStore("elementos");
    let request = store.getAll();

    request.onsuccess = function() {
        const elementos = request.result;
        const tabla = document.querySelector("#listado-elementos tbody");
        tabla.innerHTML = "";
        
        elementos.forEach(e => {
            tabla.innerHTML += `<tr><td>${e.nombre}</td><td>${e.ubicacion}</td><td>${e.cantidad}</td></tr>`;
        });
    };

    request.onerror = function(event) {
        console.error("Error al obtener elementos:", event.target.error);
    };
}

function cargarListadoUbicaciones() {
    let transaction = db.transaction(["ubicaciones"], "readonly");
    let store = transaction.objectStore("ubicaciones");
    let request = store.getAll();

    request.onsuccess = function() {
        const ubicaciones = request.result;
        const tabla = document.querySelector("#listado-ubicaciones tbody");
        tabla.innerHTML = "";

        ubicaciones.forEach(u => {
            let elementosUbicacion = [];
            
            let transElementos = db.transaction(["elementos"], "readonly");
            let storeElementos = transElementos.objectStore("elementos");
            let reqElementos = storeElementos.getAll();

            reqElementos.onsuccess = function() {
                let elementos = reqElementos.result;
                elementos.forEach(e => {
                    if (e.ubicacion === u.nombre) {
                        elementosUbicacion.push(`${e.nombre} (${e.cantidad})`);
                    }
                });

                tabla.innerHTML += `<tr><td>${u.nombre}</td><td>${elementosUbicacion.join(", ") || "Vacío"}</td></tr>`;
            };
        });
    };

    request.onerror = function(event) {
        console.error("Error al obtener ubicaciones:", event.target.error);
    };
}
