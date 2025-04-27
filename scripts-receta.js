let displayReceta = document.getElementById('recetaDisplay')
const queryString = window.location.search;

console.log(queryString);

const urlParams = new URLSearchParams(queryString);
const receta = urlParams.get('receta')
displayReceta.innerText = receta
