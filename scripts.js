let alimentos = {
	"Carnes": [
		"Pollo", "Res", "Cerdo", "Cordero", "Pavo", "Pescado",
		"Cabrito", "Venado", "Atún",
		"Salmón", "Bacalao", "Camarón", "Langosta", "Pulpo", "Mejillón",
		"Calamar", "Almeja"
	],
	"Lácteos": [
		"Leche", "Queso", "Yogurt", "Mantequilla", "Crema",
		"Leche Condensada", "Leche Evaporada", "Queso Crema",
		"Queso Parmesano", "Queso Mozzarella", "Queso Oaxaca",
		"Queso Manchego", "Queso Cotija", "Queso Ricotta"
	],
	"Frutas": [
		"Manzana", "Banana", "Naranja", "Uva", "Fresa", "Piña",
		"Sandía", "Melón", "Papaya", "Mango", "Kiwi", "Durazno",
		"Ciruela", "Pera", "Mandarina", "Cereza", "Frambuesa",
		"Mora Azul", "Granada", "Coco", "Lima", "Limón"
	],
	"Vegetales": [
		"Zanahoria", "Espinaca", "Lechuga", "Brócoli", "Pepino",
		"Pimiento", "Maíz Para Pozole", "Tomate", "Cebolla",
		"Ajo", "Coliflor", "Calabacita", "Chayote", "Nopal",
		"Betabel", "Perejil", "Apio", "Rábano", "Champiñón",
		"Berenjena", "Repollo", "Jitomate", "Alcachofa"
	],
	"Cereales": [
		"Arroz", "Harina De Trigo", "Avena", "Harina De Maíz",
		"Elote", "Cebada", "Trigo", "Maíz", "Centeno",
		"Sémola", "Quinoa", "Amaranto"
	],
	"Legumbres": [
		"Frijoles", "Lentejas", "Soya", "Chícharos", "Garbanzos",
		"Alubias", "Habas"
	],
	"Grasas": [
		"Aceite De Oliva", "Manteca", "Aguacate", "Nueces",
		"Aceite Vegetal", "Aceite De Coco", "Aceite De Canola",
		"Aceite De Girasol", "Semillas De Girasol", "Semillas De Calabaza",
		"Almendras", "Cacahuates", "Pistaches", "Mantequilla De Maní"
	],
	"Salsas": [
		"Salsa De Tomate", "Salsa Verde", "Salsa Roja", "Salsa Picante",
		"Salsa De Soya", "Salsa Inglesa", "Salsa Barbacoa", "Salsa De Ajo",
		"Salsa Teriyaki", "Salsa De Chile", "Salsa De Mango",
		"Salsa De Tamarindo", "Salsa De Queso", "Salsa De Mostaza",
		"Salsa Alfredo", "Salsa Bechamel", "Salsa De Chipotle"
	],
	"Especias": [
		"Sal", "Pimienta", "Orégano", "Comino", "Cúrcuma",
		"Canela", "Clavo", "Nuez Moscada", "Laurel", "Tomillo",
		"Romero", "Paprika", "Chile En Polvo", "Achiote",
		"Anís", "Cardamomo", "Jengibre", "Azafrán", "Cilantro Seco",
		"Mostaza En Polvo", "Curry", "Hinojo"
	]
}

async function buscarRecetas(ingredientesUsuario) {
	try {
		const response = await fetch('./recetas.json')
		const recetas = await response.json()
		let recetasFiltradas = []
		let filtroTipo = []
		recetas.forEach((receta) => {
			switch (inputCategoria.value) {
				case "":
					console.log('Selecciona una categoría primero.');
					break
				case "desayunos":
					console.log('Buscando desayunos...');
					if (receta.EsDesayuno) {
						filtroTipo.push(receta)
					}
					break
				case "comidas":
					console.log('Buscando comidas...');
					if (receta.EsComida) {
						filtroTipo.push(receta)
					}
					break
				case "cenas":
					console.log('Buscando cenas...');
					if (receta.EsCena) {
						filtroTipo.push(receta)
					}
					break
				case "botanas":
					console.log('Buscando botana...');
					if (receta.EsBotana) {
						filtroTipo.push(receta)
					}
					break
				case "categoria-cualquiera":
					if (receta.EsBotana || receta.EsDesayuno || receta.EsComida || receta.EsCena) {
						filtroTipo.push(receta)
					}
					break
			}
		});
		filtroTipo.forEach(receta => {
			let filtroIngredientes = receta.ingredientes.map(ingrediente => {
				if (ingrediente.obligatoria) {
					return ingredientesUsuario.includes(ingrediente.ingredienteTitulo);
				}
				return true;
			});
			if (filtroIngredientes.every(valor => valor)) {
				recetasFiltradas.push(receta);
			}
		})
		recetasFiltradas.forEach(e => {
			console.log(e);
		})

	} catch (error) {
		console.error('Error cargando recetas:', error)
	}
}
let inputCategoria = document.getElementById('input-categoria')
let inputTiempo = document.getElementById('input-tiempo')

let seccionCarnes = document.getElementById('seccion-carnes')
let seccionLacteos = document.getElementById('seccion-lacteos')
let seccionFrutas = document.getElementById('seccion-frutas')
let seccionVegetales = document.getElementById('seccion-vegetales')
let seccionCereales = document.getElementById('seccion-cereales')
let seccionLegumbres = document.getElementById('seccion-legumbres')
let seccionGrasas = document.getElementById('seccion-grasas')

function mostrarIngredientesInputs(seccion, tipo) {
	tipo.forEach((e) => {
		const ingrediente = document.createElement('div')
		ingrediente.setAttribute('class', 'ingrediente')

		const ingredienteCheckBox = document.createElement('input')
		ingredienteCheckBox.type = 'checkbox'
		ingredienteCheckBox.setAttribute('id', e)
		ingredienteCheckBox.setAttribute('class', 'checkboxes-inputs')

		const labelIngrediente = document.createElement('label')
		labelIngrediente.setAttribute('for', e)
		labelIngrediente.setAttribute('class', 'input-ingrediente')

		const iconoIngrediente = document.createElement('img')
		iconoIngrediente.src = `./media/ingredientes/${e}.png`
		iconoIngrediente.alt = e

		const nombreIngrediente = document.createElement('span')
		nombreIngrediente.innerText = e

		ingrediente.appendChild(ingredienteCheckBox)
		labelIngrediente.appendChild(iconoIngrediente)
		labelIngrediente.appendChild(nombreIngrediente)
		ingrediente.appendChild(labelIngrediente)
		seccion.appendChild(ingrediente)
	})
}
mostrarIngredientesInputs(seccionVegetales, alimentos.Vegetales)
mostrarIngredientesInputs(seccionCarnes, alimentos.Carnes)
mostrarIngredientesInputs(seccionLacteos, alimentos.Lácteos)
mostrarIngredientesInputs(seccionFrutas, alimentos.Frutas)
mostrarIngredientesInputs(seccionCereales, alimentos.Cereales)
mostrarIngredientesInputs(seccionLegumbres, alimentos.Legumbres)
mostrarIngredientesInputs(seccionGrasas, alimentos.Grasas)

let checkboxesInputs = document.querySelectorAll('.checkboxes-inputs')
const botonMostrarRecetas = document.getElementById('mostrar-recetas')

botonMostrarRecetas.addEventListener('click', function () {
	mostrarRecetas()
})

function mostrarRecetas() {
	let ingredientesInput = []
	checkboxesInputs.forEach((e) => {
		if (e.checked == true) {
			ingredientesInput.push(e.id)
		}
	})
	buscarRecetas(ingredientesInput)
	console.log('Ingredientes de usuario: ' + ingredientesInput)
}
