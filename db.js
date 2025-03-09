let db;

document.addEventListener("DOMContentLoaded", () => {
    let request = indexedDB.open("almacenDB", 1);

    request.onupgradeneeded = event => {
        let db = event.target.result;
        db.createObjectStore("ubicaciones", { keyPath: "id", autoIncrement: true });
        db.createObjectStore("elementos", { keyPath: "id", autoIncrement: true });
    };

    request.onsuccess = event => {
        db = event.target.result;
    };

    request.onerror = event => {
        console.error("Error al abrir la base de datos", event.target.errorCode);
    };
});

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
