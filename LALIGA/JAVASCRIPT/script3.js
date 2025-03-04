document.addEventListener("DOMContentLoaded", function () {
    // Cargar los equipos desde el JSON
    fetch("../JSON/jugadors.json")
        .then(response => response.json())
        .then(data => {
            const selectEquipos = document.getElementById("equipos-form");

            // Crear la opción por defecto
            const opcionPorDefecto = document.createElement("option");
            opcionPorDefecto.textContent = "Selecciona un equipo";
            selectEquipos.appendChild(opcionPorDefecto);

            // Recorrer el JSON y añadir cada equipo como una opción
            data.forEach(equipo => {
                if (equipo.equip) { // Verificar si el equipo tiene un nombre
                    const option = document.createElement("option");
                    option.value = equipo.equip; // Usar el nombre del equipo como valor
                    option.textContent = equipo.equip; // Usar el nombre del equipo como texto visible
                    selectEquipos.appendChild(option);
                }
            });
        })
        .catch(error => console.error("Error al cargar los equipos:", error));

    // Lógica para el select de "Tipo de persona"
    const tipopersona = document.getElementById("tipopersona");

    if (tipopersona) {
        tipopersona.addEventListener("change", function () {
            const seleccion = tipopersona.value;

            // Eliminar el select de posición y el texto si ya existen
            const selectPosicionExistente = document.getElementById("select-posicion");
            const textoExistente = document.querySelector("#miFormulario p");

            if (selectPosicionExistente) {
                selectPosicionExistente.remove();
            }
            if (textoExistente) {
                textoExistente.remove();
            }

            // Si el usuario selecciona "jugador", añadir el nuevo select y el texto
            if (seleccion === "jugador") {
                // Crear el nuevo select
                const selectPosicion = document.createElement("select");
                selectPosicion.id = "select-posicion";
                selectPosicion.name = "posicion";

                // Opciones del select
                const opciones = ["Selecciona una posición:", "davanter", "defensa", "migcampista", "porter"];
                opciones.forEach(function (opcion) {
                    const option = document.createElement("option");
                    option.value = opcion;
                    option.textContent = opcion;
                    selectPosicion.appendChild(option);
                });

                // Crear el texto para el select
                const texto = document.createElement("p");
                texto.textContent = "Selecciona una posición: ";

                // Obtener el formulario y el botón de submit
                const formulario = document.getElementById("miFormulario");
                const submitButton = document.getElementById("submit");

                // Si el formulario y el botón de submit existen, añadir el texto y el select
                if (formulario && submitButton) {
                    formulario.appendChild(texto);
                    formulario.appendChild(selectPosicion);

                    // Mover el botón de submit al final del formulario
                    formulario.appendChild(submitButton);
                }
            }
        });
    }
});