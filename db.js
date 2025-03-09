let db;

document.addEventListener("DOMContentLoaded", () => {
    let request = indexedDB.open("almacenDB", 1);

    request.onupgradeneeded = event => {
        let db = event.target.result;
        if (!db.objectStoreNames.contains("ubicaciones")) {
            db.createObjectStore("ubicaciones", { keyPath: "id", autoIncrement: true });
        }
        if (!db.objectStoreNames.contains("elementos")) {
            db.createObjectStore("elementos", { keyPath: "id", autoIncrement: true });
        }
    };

    request.onsuccess = event => {
        db = event.target.result;
        actualizarListas(); // Cargar datos después de abrir la base
    };

    request.onerror = event => {
        console.error("Error al abrir la base de datos", event.target.errorCode);
    };
});

function agregarUbicacion(nombre, comentarios) {
    let transaction = db.transaction(["ubicaciones"], "readwrite");
    let store = transaction.objectStore("ubicaciones");
    let request = store.add({ nombre, comentarios });

    request.onsuccess = () => actualizarListas();
    request.onerror = event => console.error("Error al agregar ubicación", event.target.error);
}

function agregarElemento(nombre, ubicacion, cantidad) {
    let transaction = db.transaction(["elementos"], "readwrite");
    let store = transaction.objectStore("elementos");
    let request = store.add({ nombre, ubicacion, cantidad });

    request.onsuccess = () => actualizarListas();
    request.onerror = event => console.error("Error al agregar elemento", event.target.error);
}

function obtenerUbicaciones(callback) {
    let transaction = db.transaction(["ubicaciones"], "readonly");
    let store = transaction.objectStore("ubicaciones");
    let request = store.getAll();

    request.onsuccess = () => callback(request.result);
}

function obtenerElementos(callback) {
    let transaction = db.transaction(["elementos"], "readonly");
    let store = transaction.objectStore("elementos");
    let request = store.getAll();

    request.onsuccess = () => callback(request.result);
}

function eliminarUbicacion(id) {
    let transaction = db.transaction(["ubicaciones"], "readwrite");
    let store = transaction.objectStore("ubicaciones");
    let request = store.delete(id);

    request.onsuccess = () => actualizarListas();
}

function eliminarElemento(id) {
    let transaction = db.transaction(["elementos"], "readwrite");
    let store = transaction.objectStore("elementos");
    let request = store.delete(id);

    request.onsuccess = () => actualizarListas();
}
