// MODO OBSCURO / CLARO
const buttonColorMode = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
const iconoBotonModoObscuro = document.querySelector('.material-symbols-outlined')
let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

updateButton({ buttonEl: buttonColorMode, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
	if (localStorageTheme !== null) {
		return localStorageTheme;
	}

	if (systemSettingDark.matches) {
		return "dark";
	}

	return "light";
}
function updateButton({ buttonEl, isDark }) {
	const newCta = isDark ? "light_mode" : "dark_mode";

	buttonEl.setAttribute("aria-label", newCta);
	iconoBotonModoObscuro.innerText = newCta;
	iconoBotonModoObscuro.style.color = `var(--${newCta}Contrast)`;
}
function updateThemeOnHtmlEl({ theme }) {
	document.querySelector("html").setAttribute("data-theme", theme);
}
buttonColorMode.addEventListener("click", (event) => {
	const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

	localStorage.setItem("theme", newTheme);
	updateButton({ buttonEl: buttonColorMode, isDark: newTheme === "dark" });
	updateThemeOnHtmlEl({ theme: newTheme });

	currentThemeSetting = newTheme;
});
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

		let checkboxesInputs = document.querySelectorAll('.checkboxes-inputs')
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
		const botonMostrarRecetas = document.getElementById('mostrar-recetas')
		botonMostrarRecetas.addEventListener('click', function () {
			let ingredientesInput = []
			checkboxesInputs.forEach((e) => {
				if (e.checked == true) {
					ingredientesInput.push(e.id)
				}
			})
			buscarRecetas(ingredientesInput)
		})
	})
	.catch(error => {
		console.error('Fetch error: ', error)
	})

let inputDesayunos = document.getElementById('desayunos')
let inputComidas = document.getElementById('comidas')
let inputCenas = document.getElementById('cenas')
let inputBotanas = document.getElementById('botanas')
let inputPostres = document.getElementById('postres')

const mainSection = document.querySelector('.main-section')
const rangoTiempo = document.getElementById('rango-tiempo')
const displayTiempo = document.getElementById('display-tiempo')

let seccionCarnes = document.getElementById('seccion-carnes')
let seccionLacteos = document.getElementById('seccion-lacteos')
let seccionFrutas = document.getElementById('seccion-frutas')
let seccionVegetales = document.getElementById('seccion-vegetales')
let seccionCereales = document.getElementById('seccion-cereales')
let seccionLegumbres = document.getElementById('seccion-legumbres')
let seccionGrasas = document.getElementById('seccion-grasas')

const displayIngredientes = document.getElementById('display-ingredientes')

rangoTiempo.addEventListener('input', function () {
	if (rangoTiempo.value == 240) {
		displayTiempo.innerText = 'Más de 2 horas'
	} else {
		displayTiempo.innerText = `Máximo ${Math.round(rangoTiempo.value / 10) * 10} minutos`
	}
})

async function buscarRecetas(ingredientesUsuario) {
	try {
		const response = await fetch('./recetas.json')
		const recetas = await response.json()
		let recetasFiltradas = []
		let filtroTipo = []
		let filtroTiempo = []
		const containerResultados = document.querySelector('.resultados')

		while (containerResultados.hasChildNodes()) {
			containerResultados.removeChild(containerResultados.firstChild)
		}
		recetas.forEach((receta) => {
			if ((inputDesayunos.checked && receta["EsDesayuno"] == true) || (inputCenas.checked && receta["EsCena"] == true) || (inputBotanas.checked && receta["EsBotana"] == true) || (inputPostres.checked && receta["EsPostres"] == true)) {
				filtroTipo.push(receta)
			}
		});
		filtroTipo.forEach(receta => {
			if (receta.tiempoPreparacion <= rangoTiempo.value) {
				filtroTiempo.push(receta)
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
		if (recetasFiltradas.length == 0) {
			const anuncioRecetas = document.createElement('h3')
			anuncioRecetas.setAttribute('class', 'no-recetas-anuncio')
			anuncioRecetas.innerText = '😅 No hay recetas con esas características.'
			containerResultados.appendChild(anuncioRecetas)
		} else {
			recetasFiltradas.forEach(e => {
				const articleReceta = document.createElement('article')
				articleReceta.setAttribute('class', 'resultados-receta')
				const recetaInfo = document.createElement('div')
				recetaInfo.setAttribute('class', 'resultados-receta-info')
				const tituloReceta = document.createElement('h3')
				tituloReceta.setAttribute('class', 'resultados-titulo-receta')
				const labelTiempo = document.createElement('label')
				labelTiempo.setAttribute('class', 'resultados-label-tiempo')
				const detalles = document.createElement('details')
				detalles.setAttribute('class', 'resultados-detalles')
				const summaryDetalles = document.createElement('summary')
				summaryDetalles.setAttribute('class', 'resultados-detalles-summary')
				const listaIngredientes = document.createElement('ul')
				const imgReceta = document.createElement('img')

				tituloReceta.innerText = e.titulo
				labelTiempo.innerText = `${e.tiempoPreparacion} minutos`
				summaryDetalles.innerText = 'Ingredientes necesarios'

				recetaInfo.appendChild(tituloReceta)
				recetaInfo.appendChild(labelTiempo)
				detalles.appendChild(summaryDetalles)
				detalles.appendChild(listaIngredientes)
				// tituloReceta.addEventListener('click', function () {
				// 	window.open(`./receta.html?r=${e["codigo"]}`, '_self')
				// })
				e.ingredientes.forEach(ing => {
					const elementolista = document.createElement('li')
					elementolista.innerText = ing.ingredienteTitulo
					listaIngredientes.appendChild(elementolista)
				})
				imgReceta.src = 'https://picsum.photos/250/150'
				imgReceta.alt = e.titulo
				imgReceta.setAttribute('class', 'resultados-detalles-img')

				recetaInfo.appendChild(detalles)
				articleReceta.appendChild(recetaInfo)
				articleReceta.appendChild(imgReceta)
				containerResultados.appendChild(articleReceta)

				tituloReceta.addEventListener('click', function () {
					verReceta(e)
				})
			})
		}
	} catch (error) {
		console.error('Error cargando recetas:', error)
	}
}

async function obtenerReceta(urlID) {
	try {
		const response = await fetch('./recetas.json');
		const recetas = await response.json();

		const receta = recetas.find(e => e.codigo === urlID);

		if (receta) {
			// console.log(receta);
			return receta
		} else {
			titulo.innerText = 'Receta no encontrada';
		}

	} catch (error) {
		console.error('Error cargando la receta:', error);
		// titulo.innerText = 'Error al cargar la receta';
	}
}

function verReceta(recetaObject) {
	// Limpiar contenido anterior
	const receta = recetaObject

	const recetaCompleta = document.createElement('div')
	recetaCompleta.setAttribute('class', 'receta-completa')

	const contenedorReceta = document.createElement('div')
	contenedorReceta.setAttribute('class', 'contenedor-receta')

	const imagenReceta = document.createElement('img')
	imagenReceta.setAttribute('class', 'img-receta')
	imagenReceta.src = recetaObject.imagen.url
	console.log(recetaObject.imagen.url);
	contenedorReceta.appendChild(imagenReceta)

	const headerReceta = document.createElement('div')
	headerReceta.setAttribute('class', 'header-receta')
	contenedorReceta.appendChild(headerReceta)

	const tituloRecetaDOM = document.createElement('h2')
	tituloRecetaDOM.setAttribute('class', 'titulo-receta')
	tituloRecetaDOM.innerText = recetaObject.titulo
	headerReceta.appendChild(tituloRecetaDOM)

	const duracionReceta = document.createElement('p')
	duracionReceta.setAttribute('class', 'duracion-receta')

	const iconoDuracion = document.createElement('span')
	iconoDuracion.setAttribute('class', 'material-symbols-outlined')
	iconoDuracion.innerText = 'schedule'

	const textoDuracion = document.createElement('span')
	textoDuracion.innerText = `${receta.tiempoPreparacion} minutos`

	duracionReceta.appendChild(iconoDuracion)
	duracionReceta.appendChild(textoDuracion)
	headerReceta.appendChild(duracionReceta)

	const ingredientesReceta = document.createElement('div')
	ingredientesReceta.setAttribute('class', 'ingredientes-receta')
	contenedorReceta.appendChild(ingredientesReceta)

	const tituloIngredientes = document.createElement('h3')
	tituloIngredientes.innerText = 'Ingredientes'
	ingredientesReceta.appendChild(tituloIngredientes)

	receta["ingredientes"].forEach(e => {
		const ingredienteReceta = document.createElement('label')
		ingredienteReceta.for = e["ingredienteTitulo"]
		ingredientesReceta.appendChild(ingredienteReceta)

		if (e["obligatoria"]) {
			ingredienteReceta.setAttribute('class', 'ing-receta-obli')
		} else {
			ingredienteReceta.setAttribute('class', 'ing-receta')
		}

		const checkboxIngrediente = document.createElement('input')
		checkboxIngrediente.type = 'checkbox'
		checkboxIngrediente.setAttribute('class', 'checkbox-receta')
		checkboxIngrediente.id = e["ingredienteTitulo"]
		ingredienteReceta.appendChild(checkboxIngrediente)

		const iTitulo = document.createElement('span')
		iTitulo.innerText = e["ingredienteTitulo"]
		iTitulo.setAttribute('class', 'ingrediente-titulo')
		ingredienteReceta.appendChild(iTitulo)

		const iCantidad = document.createElement('span')
		iCantidad.innerText = e["porcion"]
		iCantidad.setAttribute('class', 'cantidad')
		ingredienteReceta.appendChild(iCantidad)

		const iTipoPorcion = document.createElement('span')
		iTipoPorcion.innerText = e["tipoDePorcion"]
		iTipoPorcion.setAttribute('class', 'tipo-porcion')
		ingredienteReceta.appendChild(iTipoPorcion)

		if (e["obligatoria"]) {
			const iObligatorio = document.createElement('span')
			iObligatorio.innerText = '¡Es muy necesario!'
			iObligatorio.setAttribute('class', 'obligatorio')
			ingredienteReceta.appendChild(iObligatorio)
		}

	})
	const recetaProcedimiento = document.createElement('span')
	recetaProcedimiento.setAttribute('class', 'procedimiento')
	contenedorReceta.appendChild(recetaProcedimiento)

	const tituloProcedimiento = document.createElement('h3')
	tituloProcedimiento.innerText = '¡Hora de cocinar!'
	recetaProcedimiento.appendChild(tituloProcedimiento)

	receta["pasos"].forEach(e => {
		const contenedorPaso = document.createElement('div')
		contenedorPaso.setAttribute('class', 'paso')
		recetaProcedimiento.appendChild(contenedorPaso)

		const idPaso = receta["pasos"].indexOf(e)
		const checkboxPaso = document.createElement('input')
		checkboxPaso.type = 'checkbox'
		checkboxPaso.setAttribute('class', 'checkbox-paso')
		checkboxPaso.id = idPaso
		contenedorPaso.appendChild(checkboxPaso)

		const contenidoPaso = document.createElement('label')
		contenidoPaso.setAttribute('class', 'paso-descripcion')
		contenidoPaso.setAttribute('for', idPaso)
		contenidoPaso.innerText = e
		contenedorPaso.appendChild(contenidoPaso)
	})

	const recetaSocial = document.createElement('div')
	recetaSocial.setAttribute('class', 'social')
	contenedorReceta.appendChild(recetaSocial)

	const tituloSocial = document.createElement('h3')
	tituloSocial.innerText = 'Comparte esta receta'
	recetaSocial.appendChild(tituloSocial)

	const contenedorSocial = document.createElement('div')
	contenedorSocial.setAttribute('class', 'social-contenedor')
	recetaSocial.appendChild(contenedorSocial)

	const botonSocialFacebook = document.createElement('div')
	botonSocialFacebook.setAttribute('class', 'boton-social')
	contenedorSocial.appendChild(botonSocialFacebook)

	botonSocialFacebook.onclick = function () {
		window.open(`https://www.facebook.com/dialog/share?
  app_id=24664638086467123&display=popup&href=http://esjaydev.github.io/AppRecetas&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer`, '_blank')
	}

	const iconoFacebook = document.createElement('img')
	iconoFacebook.src = './media/social/facebook.png'
	botonSocialFacebook.appendChild(iconoFacebook)

	const nombreFacebook = document.createElement('span')
	nombreFacebook.innerText = 'Facebook'
	botonSocialFacebook.appendChild(nombreFacebook)

	const botonSocialWhatsApp = document.createElement('div')
	botonSocialWhatsApp.setAttribute('class', 'boton-social')
	contenedorSocial.appendChild(botonSocialWhatsApp)

	const iconoWhatsApp = document.createElement('img')
	iconoWhatsApp.src = './media/social/whatsapp.png'
	botonSocialWhatsApp.appendChild(iconoWhatsApp)

	const nombreWhatsApp = document.createElement('span')
	nombreWhatsApp.innerText = 'WhatsApp'
	botonSocialWhatsApp.appendChild(nombreWhatsApp)

	const botonSocialEnlace = document.createElement('div')
	botonSocialEnlace.setAttribute('class', 'boton-social')
	contenedorReceta.appendChild(botonSocialEnlace)

	const iconoEnlace = document.createElement('img')
	iconoEnlace.src = './media/social/link.png'
	botonSocialEnlace.appendChild(iconoEnlace)

	const nombreEnlace = document.createElement('span')
	nombreEnlace.innerText = 'Copia el enlace'
	botonSocialEnlace.appendChild(nombreEnlace)

	const botonCerrar = document.createElement('button')
	botonCerrar.setAttribute('class', 'cerrar-receta')

	const iconoBotonCerrar = document.createElement('span')
	iconoBotonCerrar.setAttribute('class', 'material-symbols-outlined')
	iconoBotonCerrar.innerText = 'close'
	botonCerrar.appendChild(iconoBotonCerrar)
	botonCerrar.onclick = function () {
		recetaCompleta.remove()
	}
	recetaCompleta.appendChild(botonCerrar)

	recetaCompleta.appendChild(contenedorReceta)
	mainSection.appendChild(recetaCompleta)
}

window.addEventListener('load', function () {
	const x = {
		"codigo": "0001",
		"titulo": "Tacos al Pastor Caseros",
		"imagen": {
			"url": "./media/imagenes_recetas/ejemplo.webp"
		},
		"tiempoPreparacion": 90,
		"ingredientes": [
			{
				"ingredienteTitulo": "Lomo de Cerdo",
				"tipoDePorcion": "gramos",
				"porcion": 500,
				"obligatoria": true
			},
			{
				"ingredienteTitulo": "Piña",
				"tipoDePorcion": "gramos",
				"porcion": 150,
				"obligatoria": true
			},
			{
				"ingredienteTitulo": "Tortilla de Maíz",
				"tipoDePorcion": "unidades",
				"porcion": 16,
				"obligatoria": true
			},
			{
				"ingredienteTitulo": "Cilantro Fresco",
				"tipoDePorcion": "ramas",
				"porcion": 5,
				"obligatoria": false
			},
			{
				"ingredienteTitulo": "Cebolla",
				"tipoDePorcion": "gramos",
				"porcion": 50,
				"obligatoria": false
			},
			{
				"ingredienteTitulo": "Salsa Picante",
				"tipoDePorcion": "mililitros",
				"porcion": 30,
				"obligatoria": false
			}
		],
		"pasos": [
			"Marinar el lomo de cerdo con achiote, especias y jugo de piña por al menos 1 hora.",
			"Cocinar el cerdo marinado en una sartén o en un asador hasta que esté bien cocido.",
			"Calentar las tortillas de maíz.",
			"Picar finamente el cilantro y la cebolla.",
			"Servir el cerdo en las tortillas con trozos de piña, cilantro, cebolla y salsa picante al gusto."
		],
		"EsDesayuno": false,
		"EsComida": true,
		"EsCena": true,
		"EsBotana": true
	}
	verReceta(x)
})