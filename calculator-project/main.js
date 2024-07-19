/* eslint-disable quote-props */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import './style.css'
import { add, substract, divide, multiply } from './functions/operations.js'

const numbers = [1, 2, 3, 4, 5, 6, 8, 9, 0]
const operation = []
const operators = ['+', '-', 'x', '/']
let result = null
let allowPoint = true

let allowInput = true

window.operate = function (value) {
  switch (value) {
    case 'C':
      handleClear()
      break
    case '<':
      handleDelete(operation)
      break
    case '.':
      handlePoint()
      break
    case '=':
      handleResult(operation)
      break
    default:
      addValue(operation, value)
  }
  updateDisplay()
}

function handleClear () {
  clearValues()
  updateDisplay()
  updateResult('')
}

function handleDelete (operation) {
  if (operation[operation.length - 1] === '.') {
    allowPoint = true
  }

  if (operation.length !== 0) {
    operation.pop()
  } /* else {
    result = null
  } */
  if (result !== null) {
    result = null
    updateResult('') // Cuando borre un numero, se borra el resultado de la pantalla. No se borra la variable Result
  }
  updateDisplay()
}

function handleResult (operation) {
  // Boton '=' , para obtener el resultado. ERROR: NO REALIZA EL CALCULO Y EL RESULTADO ES UNDEFINED. POSIBLE ERROR EN EVALOPERATION O EN ESTE IF.
  if (operation.length !== 0) {
    if (hasOperatorAtEnd(operation)) {
      operation.pop()
    }
    if (hasOperator(operation)) {
      result = evalOperation(operation)
    } else {
      result = parseFloat(operation.join(''))
    }

    console.log(result)
    console.log(operation)

    if (isNaN(result) || result === Infinity) {
      result = 'Error'
    }
    allowPoint = true
    allowInput = false
    updateDisplay()
    updateResult(result)
  }
}

function handlePoint () {
  if (allowPoint && allowInput) {
    console.log('Agregando punto')
    if (result === null && operation.length === 0) { // Permite agregar un 0 y luego el '.' cuando no hay nada en el display
      clearValues()
      operation.push('0')
      operation.push('.')
      allowPoint = false
      updateResult()
    } else if (hasOperatorAtEnd(operation)) { // Permite poner '.' luego de un signo. Agrega un 0 antes del punto.
      operation.push(0)
      operation.push('.')
      allowPoint = false
    } else {
      allowPoint = false
      operation.push('.')
    }
  }
}

function addValue (operation, value) {
  if (operators.includes(value)) {
    if (result !== null) { // Funciona como Ans.
      const resultValue = result
      clearValues()
      operation.push(resultValue)
      operation.push(value)
      updateDisplay()
      updateResult()
    } else if (operation.length === 0) {
      operation.push('0')
      operation.push(value)
      allowPoint = true
    } else if (hasOperatorAtEnd(operation) && !hasRepeatedOperator(operation, value) && allowInput) {
      operation.pop()
      operation.push(value)
      allowPoint = true
    } else if (!hasOperator(operation)) {
      operation.push(value)
      allowPoint = true
    }
  } else if (allowInput) {
    operation.push(value)
  }
} // AGREGAR FUNCION PARA QUE CUANDO SE AGREGA OTRO SIGNO LLAMAR A LA FUNCION HANDLERESULT.

function hasOperator (operation) {
  for (const value of operation) {
    if (operators.includes(value)) return true
  }
  return false
}

function hasOperatorAtEnd (operation) {
  if (operators.includes(operation[operation.length - 1]) || operation[operation.length - 1] === '.') {
    return true
  }
  return false
}

function hasRepeatedOperator (array, value) {
  if (array[operation.length - 1] === value) {
    return true
  }
  return false
}

function updateDisplay () {
  document.querySelector('#display').textContent = operation.join('')
}

function updateResult (value) {
  document.querySelector('#result').textContent = value
}

function clearValues () {
  operation.length = 0
  result = null
  allowInput = true
  allowPoint = true
}

function hasError (array) {
  array.forEach(value => {
    if (isNaN(value)) {
      // const error = 'Syntax Error'
      return true
    }
  })
  return false
}

function evalOperation (array) {
  if (operation.includes('+')) {
    const numbers = array.join('').split('+')
    const resultValue = hasError(array) ? 'Syntax Error' : add(numbers)
    return resultValue
  } else if (array.includes('-')) {
    const numbers = array.join('').split('-')
    const resultValue = hasError(array) ? 'Syntax Error' : substract(numbers)
    return resultValue
  } else if (array.includes('/')) {
    const numbers = array.join('').split('/')
    const resultValue = hasError(array) ? 'Syntax Error' : divide(numbers)
    return resultValue
  } else if (array.includes('x')) {
    const numbers = array.join('').split('x')
    const resultValue = hasError(array) ? 'Syntax Error' : multiply(numbers)
    return resultValue
  }
}

function keyUse (event) {
  const keysMap = {
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    '+': '+',
    '-': '-',
    '*': 'x',
    '/': '/',
    'Enter': '=',
    'Backspace': '<',
    'Delete': 'C',
    '.': '.'
  }
  if (keysMap[event.key]) operate(keysMap[event.key])
}

document.addEventListener('keydown', keyUse)

document.querySelector('#app').innerHTML = `
<h1> Calculator Project </h1>
<main>
<div class='calculator'>
<div class='screen'>
<div>
<h2 id='display'></h2>
<h2 id='result'></h2>
</div>
</div>
<div class='pad'>
<ul class='buttons'>
<li onclick="operate('+')">+</li>
<li onclick="operate('-')">-</li>
<li onclick="operate('x')">x</li>
<li onclick="operate('/')">/</li>
${numbers.map(number => `<li key='${number}' onclick="operate(${number})">${number}</li>`).join('')}
<li onclick="operate('=')">=</li>
<li onclick="operate('C')">C</li>
<li onclick="operate('<')">del</li>
<li onclick="operate('.')">.</li>
</ul>
</div>
</div>
</main>
`

/*
  if (value === 'C') { // Boton C, para borrar todos los datos de la pantalla

  } else if (value === '<') { // Boton Backspace. No borra el dato del RESULTADO. ver que hacer.
    if (operation.length !== 0) {
      operation.pop()
    } else {
      result = null
    }
    if (result !== null) updateResult('') // Cuando borre un numero, se borra el resultado de la pantalla. No se borra la variable Result
    updateDisplay()
  } else if (value !== '=' && value !== '.') { // Cualquier valor (numero o signo) excepto el '.'
    if (/* hasRepeatedOperator(operation) && isNaN(parseFloat(value))  (hasOperatorAtEnd(operation) && operators.includes(value)) && !hasRepeatedOperator(value, operation)) {
      // Verifica que no se repitan 2 signos seguidos y filtra que sea un numero
      operation.pop()
      operation.push(value)
      console.log('hasta aca')
    } else if (allowInput && operators.includes(value)) {
      console.log("Agregando valor")
      if (operators.includes(value)) {
        allowPoint = true
      }
      operation.push(value)
    } else {
      operation.push(value)
    }
  }
  if (value === '.') {
    console.log("Agregando punto")
    if (result === null && operation.length === 0 && allowPoint) { // Permite agregar un 0 y luego el '.' cuando no hay nada en el display
      clearValues()
      operation.push('0')
      operation.push(value)
      allowPoint = false
      updateResult()
    } else if (hasOperatorAtEnd(operation) && allowPoint) { // Permite poner '.' luego de un signo. Agrega un 0 antes del punto.
      operation.push(0)
      operation.push(value)
      allowPoint = false
    } else if (allowPoint) {
      allowPoint = false
      operation.push(value)
    }
  }
  if (operators.includes(value) && result !== null) { // Al agregar un signo luego de tener resultado, aplicamos el signo al resultado.
  // Funciona como Ans.
  const resultValue = result
  clearValues()
  operation.push(resultValue)
  operation.push(value)
  updateDisplay()
  updateResult()
}

updateDisplay()
*/

/* if (value === '=') { // Boton '=' , para obtener el resultado. ERROR: NO REALIZA EL CALCULO Y EL RESULTADO ES UNDEFINED. POSIBLE ERROR EN EVALOPERATION O EN ESTE IF.
    if (hasOperatorAtEnd(operation)) {
      operation.pop()
    }
    if (hasOperator(operation)) {
      result = evalOperation(operation)
      console.log("fasda")
    } else {
      result = parseFloat(operation.join(''))
      console.log(hasOperator(operation))
    }

    console.log(result)
    console.log(operation)
    if (isNaN(result)) {
      result = 'Error'
    }
    allowPoint = true
    updateDisplay()
    updateResult(result)
    allowInput = false
  } */
