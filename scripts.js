let alimentos = {
  Carnes: ["Pollo", "Res", "Cerdo", "Cordero", "Pavo", "Pescado"],
  Lácteos: ["Leche", "Queso", "Yogur", "Mantequilla", "Crema"],
  Frutas: ["Manzana", "Banana", "Naranja", "Uva", "Fresa", "Piña"],
  Vegetales: ["Zanahoria", "Espinaca", "Lechuga", "Brócoli", "Pepino", "Pimiento"],
  Cereales: ["Arroz", "Trigo", "Avena", "Maíz", "Cebada", "Centeno"],
  Legumbres: ["Frijoles", "Lentejas", "Garbanzos", "Soya", "Arvejas"],
  Grasas: ["Aceite de oliva", "Manteca", "Aguacate", "Nueces", "Semillas", "Margarina"]
}
let seccionCarnes = document.getElementById('seccion-carnes')
let seccionLacteos = document.getElementById('seccion-lacteos')
let seccionFrutas = document.getElementById('seccion-frutas')
let seccionVegetales = document.getElementById('seccion-vegetales')
let seccionCereales = document.getElementById('seccion-cereales')
let seccionLegumbres = document.getElementById('seccion-legumbres')
let seccionGrasas = document.getElementById('seccion-grasas')

function mostrarIngredientesInputs(seccion, titulo){
    
    alimentos.titulo.forEach(e => {
        const ingrediente = document.createElement('div')
        ingrediente.setAttribute('class', 'ingrediente')
        const ingredienteCheckBox = document.createElement('input')
        ingredienteCheckBox.type = 'checkbox'
        ingredienteCheckBox.setAttribute('id', e)
        ingrediente.appendChild(ingredienteCheckBox)
        seccion.appendChild(ingrediente)
    })
    
}
mostrarIngredientesInputs(seccionCarnes, 'Carnes')