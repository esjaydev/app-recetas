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
				tituloReceta.addEventListener('click', function () {
					window.open(`./receta.html?r=${e["codigo"]}`, '_self')
				})
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
			})
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
		const botonMostrarRecetas = document.getElementById('mostrar-recetas')
		botonMostrarRecetas.addEventListener('click', function () {
			mostrarRecetas()
		})
	})
	.catch(error => {
		console.error('Fetch error: ', error)
	})


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

const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
const iconoBotonModoObscuro = document.querySelector('.material-symbols-outlined')
let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

button.addEventListener("click", (event) => {
	const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

	localStorage.setItem("theme", newTheme);
	updateButton({ buttonEl: button, isDark: newTheme === "dark" });
	updateThemeOnHtmlEl({ theme: newTheme });

	currentThemeSetting = newTheme;
}); 