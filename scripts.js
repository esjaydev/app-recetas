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
			inputDesayunos, inputComidas, inputCenas, inputBotanas, inputPostres
			if (inputDesayunos.checked) {
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
					verReceta(e["codigo"])
				})
			})
		}
	} catch (error) {
		console.error('Error cargando recetas:', error)
	}
}
let inputDesayunos = document.getElementById('desayunos')
let inputComidas = document.getElementById('comidas')
let inputCenas = document.getElementById('cenas')
let inputBotanas = document.getElementById('botanas')
let inputPostres = document.getElementById('postres')

let inputTiempo = document.getElementById('input-tiempo')

let seccionCarnes = document.getElementById('seccion-carnes')
let seccionLacteos = document.getElementById('seccion-lacteos')
let seccionFrutas = document.getElementById('seccion-frutas')
let seccionVegetales = document.getElementById('seccion-vegetales')
let seccionCereales = document.getElementById('seccion-cereales')
let seccionLegumbres = document.getElementById('seccion-legumbres')
let seccionGrasas = document.getElementById('seccion-grasas')

const displayIngredientes = document.getElementById('display-ingredientes')

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

function verReceta(urlID) {
	// const receta = obtenerReceta(urlID)

	// Limpiar contenido anterior
	const recetaCompleta = document.createElement('div')
	recetaCompleta.setAttribute('class', 'receta-completa')

	const contenedorReceta = document.createElement('div')
	contenedorReceta.setAttribute('class', 'cerrar-receta')
	recetaCompleta.appendChild(contenedorReceta)

	const botonCerrar = document.createElement('button')
	botonCerrar.setAttribute('class', 'cerrar-receta')
	recetaCompleta.appendChild(botonCerrar)

	const iconoBotonCerrar = document.createElement('span')
	iconoBotonCerrar.setAttribute('class', 'material-symbols-outlined')
	iconoBotonCerrar.innerText = 'close'
	botonCerrar.appendChild(iconoBotonCerrar)

	mainSection.appendChild(recetaCompleta)
}

async function obtenerReceta(urlID) {
	try {
		const response = await fetch('./recetas.json');
		const recetas = await response.json();

		const receta = recetas.find(e => e.codigo === urlID);

		if (receta) {
			console.log(receta);
			return receta
		} else {
			titulo.innerText = 'Receta no encontrada';
		}

	} catch (error) {
		console.error('Error cargando la receta:', error);
		titulo.innerText = 'Error al cargar la receta';
	}
}
const mainSection = document.querySelector('.main-section')
const rangoTiempo = document.getElementById('rango-tiempo')
const displayTiempo = document.getElementById('display-tiempo')
rangoTiempo.addEventListener('input', function () {
	if (rangoTiempo.value == 240) {
		displayTiempo.innerText = 'Más de 2 horas'
	} else {
		displayTiempo.innerText = `Máximo ${Math.round(rangoTiempo.value / 10) * 10} minutos`
	}
})