let alimentos = {
  Carnes: ["Pollo", "Res", "Cerdo", "Cordero", "Pavo", "Pescado"],
  Lácteos: ["Leche", "Queso", "Yogurt", "Mantequilla", "Crema"],
  Frutas: ["Manzana", "Banana", "Naranja", "Uva", "Fresa", "Piña"],
  Vegetales: ["Zanahoria", "Espinaca", "Lechuga", "Brócoli", "Pepino", "Pimiento"],
  Cereales: ["Arroz", "Harina de Trigo", "Avena", "Harina de Maíz", "Elote", "Cebada"],
  Legumbres: ["Frijoles", "Lentejas", "Soya", "Chicharos"],
  Grasas: ["Aceite de oliva", "Manteca", "Aguacate", "Nueces", "Aceite Vegetal"]
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

function mostrarIngredientesInputs(seccion, tipo){
    tipo.forEach(e => {      
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
botonMostrarRecetas.addEventListener('click', function(){
  console.log(`Mostrar recetas que se realicen ${inputTiempo.value}`);
  console.log(`Mostrar recetas para ${inputCategoria.value}`);
  
  checkboxesInputs.forEach(e => {
    if(e.checked == true){
      console.log(e.id);
    } 
  })
})

// const recetasFiltradas = recetas.filter(receta =>
//   ingredientesBuscados.every(ingBuscado =>
//     receta.ingredientesObligatorios.some(ing =>
//       ing.ingrediente === ingBuscado
//     )
//   )
// );
