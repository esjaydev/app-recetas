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
		"Sémola", "Quinoa", "Amaranto", 'Tortillas de Maíz'
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
		let filtroTiempo = []
		recetas.forEach((receta) => {
			switch (inputCategoria.value) {
				case "":
					console.log('Selecciona una opción');
					break
				case "desayunos":
					if (receta.EsDesayuno) {
						filtroTipo.push(receta)
					}
					break
				case "comidas":
					if (receta.EsComida) {
						filtroTipo.push(receta)
					}
					break
				case "cenas":
					if (receta.EsCena) {
						filtroTipo.push(receta)
					}
					break
				case "botanas":
					if (receta.EsBotana) {
						filtroTipo.push(receta)
					}
					break
				case "categoria-cualquiera":
					filtroTipo.push(receta)
					break
				default:
					filtroTipo.push(receta)
					break
			}
		});
		filtroTipo.forEach(receta => {
			switch (inputTiempo.value) {
				case "rapido":
					if (receta.tiempoPreparacion <= 30) {
						filtroTiempo.push(receta)
					}
					break
				case "moderado":
					if (receta.tiempoPreparacion > 30 && receta.tiempoPreparacion <= 90) {
						filtroTiempo.push(receta)
					}
					break
				case "extendido":
					if (receta.tiempoPreparacion > 90) {
						filtroTiempo.push(receta)
					}
					break
			}
		})
		filtroTiempo.forEach(receta => {
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
		if (recetasFiltradas.length == 0) {
			console.log("No hay recetas.");

		}
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

const displayIngredientes = document.getElementById('display-ingredientes')
window.onload = function () {
	fetch('./ingredientes.json')
		.then(response => {
			if (!response.ok) {
				throw new Error('Error: ' + response.status)
			} return response.json()
		})
		.then(data => {
			data.forEach(e => {
				const nuevoGrupo = document.createElement('details')
				nuevoGrupo.setAttribute('class', 'grupo-ingredientes')
				const labelGrupo = document.createElement('summary')
				labelGrupo.innerText = e.Grupo

				nuevoGrupo.appendChild(labelGrupo)

				e.Subgrupos.forEach(sub => {
					const nuevoSubgrupo = document.createElement('details')
					nuevoSubgrupo.setAttribute('class', 'subgrupo-ingredientes')
					const labelSubgrupo = document.createElement('summary')
					labelSubgrupo.innerText = sub.Subgrupo
					const contenedorIngredientes = document.createElement('div')
					contenedorIngredientes.setAttribute('class', 'contenedor-ingredientes')

					nuevoSubgrupo.appendChild(labelSubgrupo)
					nuevoSubgrupo.appendChild(contenedorIngredientes)
					nuevoGrupo.appendChild(nuevoSubgrupo)

					sub.Ingredientes.forEach(ing => {
						const ingrediente = document.createElement('div')
						ingrediente.setAttribute('class', 'ingrediente')

						const ingredienteCheckBox = document.createElement('input')
						ingredienteCheckBox.type = 'checkbox'
						ingredienteCheckBox.setAttribute('id', ing)
						ingredienteCheckBox.setAttribute('class', 'checkboxes-inputs')

						const labelIngrediente = document.createElement('label')
						labelIngrediente.setAttribute('for', ing)
						labelIngrediente.setAttribute('class', 'input-ingrediente')

						const iconoIngrediente = document.createElement('img')
						iconoIngrediente.src = `./media/ingredientes/${ing}.png`
						iconoIngrediente.alt = ing

						const nombreIngrediente = document.createElement('span')
						nombreIngrediente.innerText = ing

						ingrediente.appendChild(ingredienteCheckBox)
						labelIngrediente.appendChild(iconoIngrediente)
						labelIngrediente.appendChild(nombreIngrediente)
						ingrediente.appendChild(labelIngrediente)
						contenedorIngredientes.appendChild(ingrediente)
					})
				})
				displayIngredientes.appendChild(nuevoGrupo)
			})
			let checkboxAll = document.getElementById('all')
			checkboxAll.addEventListener('click', function () {
				if (checkboxAll.checked) {
					checkboxesInputs.forEach(e => {
						e.checked = true
					})
				} else {
					checkboxesInputs.forEach(e => {
						e.checked = false
					})

				}
			})
		})
		.catch(error => {
			console.error('Fetch error: ', error)
		})
}

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