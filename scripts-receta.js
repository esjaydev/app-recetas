const urlParams = new URLSearchParams(window.location.search)
const myParam = urlParams.get('r')

async function obtenerReceta(urlID) {
    let titulo = document.getElementById('titulo')
    let tiempo = document.getElementById('tiempo')
    let ingredientes = document.getElementById('ingredientes')
    try {
        const response = await fetch('./recetas.json')
        const recetas = await response.json()
        recetas.forEach(e => {
            if (e.codigo == urlID) {
                titulo.innerText = e.titulo
                tiempo.innerText = e.tiempoPreparacion
                e.ingredientes.forEach(ing => {
                    const elem = document.createElement('li')
                    elem.innerText = ing.ingredienteTitulo
                    ingredientes.appendChild(elem)
                })
            }

        });

    } catch (error) {
        console.error('Error cargando la receta:', error)
    }
}
obtenerReceta(myParam)
