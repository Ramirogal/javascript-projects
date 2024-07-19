function add (array) {
  let result = array[0].includes('.') ? parseFloat(array[0]) : parseInt(array[0])

  array.forEach((number, index) => {
    if (index === 0) return
    if (number.includes('.')) {
      result += parseFloat(number)
    } else {
      result += parseInt(number)
    }
  })
  return result
}

function substract (array) {
  let result = array[0].includes('.') ? parseFloat(array[0]) : parseInt(array[0])

  array.forEach((number, index) => {
    if (index === 0) return
    if (number.includes('.')) {
      result -= parseFloat(number)
    } else {
      result -= parseInt(number)
    }
  })
  return result
}

function multiply (array) {
  let result = array[0].includes('.') ? parseFloat(array[0]) : parseInt(array[0])

  array.forEach((number, index) => {
    if (index === 0) return
    if (number.includes('.')) {
      result = result * parseFloat(number)
    } else {
      result = result * parseInt(number)
    }
  })
  return result
}

function divide (array) {
  let result = array[0].includes('.') ? parseFloat(array[0]) : parseInt(array[0])

  array.forEach((number, index) => {
    if (index === 0) return
    if (number.includes('.')) {
      result = result / parseFloat(number)
    } else {
      result = result / parseInt(number)
    }
  })
  return result
}

export { add, substract, multiply, divide }
