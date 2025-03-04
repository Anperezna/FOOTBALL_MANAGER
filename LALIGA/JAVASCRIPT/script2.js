document.addEventListener("DOMContentLoaded", function () {
    // Obtener el ID del equipo de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const targetid = urlParams.get('targetid');
    console.log("ID del equipo seleccionado:", targetid); // Log del ID

    fetch("JSON/jugadors.json")
        .then(function (response) {
            if (!response.ok) {
                console.error("No se pudo acceder al archivo JSON");
                return;
            }
            return response.json();
        })
        .then(function (equiposData) {
            console.log("Datos de equipos:", equiposData); // Log de los datos del JSON
            const equipoSeleccionado = equiposData.find(equipo => equipo.equip === targetid);
            if (equipoSeleccionado) {
                mostrarJugadores(equipoSeleccionado); // Pasar el objeto completo del equipo
            } else {
                console.error("Equipo no encontrado");
            }
        })
        .catch(function (error) {
            console.error('Error al cargar el JSON:', error);
        });
});

function mostrarJugadores(equipo) {
    const contenedor = document.getElementById("jugadores-lista");
    const diventrenador = document.getElementById("diventrenador");
    const logoequipo = document.getElementById("logoequipo");

    // Limpiar los contenedores antes de mostrar nuevos datos
    contenedor.innerHTML = '';
    diventrenador.innerHTML = '';
    logoequipo.innerHTML = '';

    // Crear un div para mostrar el escudo del equipo
    const escudoDiv = document.createElement("div");
    const escudoImg = document.createElement("img");
    escudoImg.src = equipo.escut; // Acceder al escudo del equipo
    escudoImg.alt = "Escudo del equipo";
    escudoDiv.appendChild(escudoImg);
    logoequipo.appendChild(escudoDiv);

    // Crear y añadir los jugadores al contenedor
    equipo.jugadors.forEach(jugador => {
        const div = document.createElement("div");
        div.className = "jugador";

        const img = document.createElement("img");
        img.src = jugador.foto;
        img.alt = jugador.nomPersona;
        img.className = "foto-jugador";

        const nombre = document.createElement("p");
        nombre.textContent = jugador.nomPersona;

        const dorsal = document.createElement("p");
        dorsal.textContent = `Dorsal: ${jugador.dorsal}`;

        const posicion = document.createElement("p");
        posicion.textContent = `Posición: ${jugador.posicio}`;

        const calidad = document.createElement("p");
        calidad.textContent = `Calidad: ${jugador.qualitat}`;

        // Añadir elementos al div del jugador
        div.appendChild(img);
        div.appendChild(nombre);
        div.appendChild(dorsal);
        div.appendChild(posicion);
        div.appendChild(calidad);

        // Añadir el div del jugador al contenedor
        contenedor.appendChild(div);
    });

    // Crear el contenedor del entrenador
    const imgentrendorDiv = document.createElement("div");
    imgentrendorDiv.className = "entrenador";

    // Crear la imagen del entrenador
    const imgentreandor = document.createElement("img");
    imgentreandor.src = equipo.entrenador.foto;
    imgentreandor.alt = equipo.entrenador.nomPersona;
    imgentreandor.className = "foto-entrenador";

    // Crear el nombre del entrenador
    const nombreEntrenador = document.createElement("p");
    nombreEntrenador.textContent = equipo.entrenador.nomPersona;

    // Añadir la imagen y el nombre al contenedor del entrenador
    imgentrendorDiv.appendChild(imgentreandor);
    imgentrendorDiv.appendChild(nombreEntrenador);

    // Añadir el contenedor del entrenador al contenedor principal
    diventrenador.appendChild(imgentrendorDiv);
}