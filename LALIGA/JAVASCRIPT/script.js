// script.js para index.html
document.addEventListener("DOMContentLoaded", function () {
    const equipos = document.getElementById("equipos");

    equipos.addEventListener("click", function (evento) {
        if (evento.target.tagName === "IMG") {
            let targetid = evento.target.id; // Obtiene el ID de la imagen clicada
            console.log("ID del equipo a redirigir:", targetid); // Log del ID
            window.location.href = `plantilla.html?targetid=${targetid}`; // Redirige a plantilla.html
        }
    });
});
