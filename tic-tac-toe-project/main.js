/* eslint-disable no-useless-return */
/* eslint-disable quotes */
import './style.css'

const token = {
  x: '✖', // '✘'
  o: '〇' // '○'
}

let turn = token.x
const gameBoard = new Array(9).fill(null)
let hasWon = false

/* if (window.localStorage.getItem('board')) {
  gameBoard = JSON.parse(window.localStorage.getItem('board'))
} */

function handleClick (event) {
  if (hasWon) {
    resetGame()
    return
  }
  const box = event.target
  const index = box.getAttribute('data-index')

  if (gameBoard[index] !== null) {
    console.log("Este cuadro ya esta ocupado")
    return
  }
  box.textContent = turn
  gameBoard[index] = turn
  console.log(gameBoard)

  if (!hasWon) {
    hasWon = checkWinner(gameBoard)
  }
  if (hasWon) {
    console.log("El juego termino.")
    setWinnerStyle(turn)
    return
  } else {
    turn = box.textContent === token.x ? token.o : token.x
  }
  setTurn(turn)

  updateBoard()
}

function checkWinner (board) {
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (const i of combos) {
    const [a, b, c] = i
    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
      console.log("combo")
      return true
    }
  }
  return false
}

function setTurn (tokenTurn, flag) {
  const infoTurn = document.querySelector('.info')
  if (hasWon) {
    infoTurn.textContent = `Gano Jugador ${tokenTurn}`
  } else {
    infoTurn.textContent = `Jugador ${tokenTurn}`
  }
}

function setWinnerStyle (tokenTurn) {
  const infoWinner = document.querySelector('.info')
  infoWinner.textContent = `Ganador ${tokenTurn}`
  infoWinner.classList.add('winner')
}

function resetWinnerStyle () {
  const infoWinner = document.querySelector('.info')
  infoWinner.classList.remove('winner')
}

function updateBoard () {
  boxes.forEach(box => {
    box.textContent = gameBoard[box.getAttribute('data-index')]
  })
}

function resetGame () {
  if (gameBoard.includes(token.x) || gameBoard.includes(token.o)) {
    gameBoard.fill(null)
    turn = token.x
    hasWon = false
    setTurn(token.x)
    resetWinnerStyle()
    updateBoard()
  } else {
    return
  }
}

/* function saveGame (board) {
  window.localStorage.setItem('board', JSON.stringify(board))
} */

document.querySelector('#app').innerHTML = `
  <h1>Tic-Tac-Toe</h1>
  <h3 class="info">Jugador ${turn}</h3>
  <main>
    <ul class="board">
      ${gameBoard.map((box, index) => `<li key="${index}" data-index="${index}" class="box"></li>`).join('')}
    </ul>
    <button id="resetButton">Reiniciar</button>
  </main>
  </main>
  `

const boxes = document.querySelectorAll('.box')
boxes.forEach(box => box.addEventListener('click', handleClick))

const resetButton = document.getElementById('resetButton')
resetButton.addEventListener('click', resetGame)
