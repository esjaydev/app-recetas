const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get('r');

async function obtenerReceta(urlID) {
    const titulo = document.getElementById('titulo');
    const tiempo = document.getElementById('tiempo');
    const ingredientes = document.getElementById('ingredientes');

    // Limpiar contenido anterior
    titulo.innerText = '';
    tiempo.innerText = '';
    ingredientes.innerHTML = '';

    try {
        const response = await fetch('./recetas.json');
        const recetas = await response.json();

        const receta = recetas.find(e => e.codigo === urlID);

        if (receta) {
            titulo.innerText = receta.titulo;
            tiempo.innerText = `${receta.tiempoPreparacion} minutos`;

            receta.ingredientes.forEach(ing => {
                const li = document.createElement('li');
                li.innerText = `${ing.ingredienteTitulo} (${ing.porcion} ${ing.tipoDePorcion})`;
                ingredientes.appendChild(li);
            });
        } else {
            titulo.innerText = 'Receta no encontrada';
        }

    } catch (error) {
        console.error('Error cargando la receta:', error);
        titulo.innerText = 'Error al cargar la receta';
    }
}

window.onload = function () {
    obtenerReceta(idParam);
}
