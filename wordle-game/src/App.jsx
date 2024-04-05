import { useState } from 'react'
import StartGame  from './components/StartGame'
import './App.css'
import PlayGame from './components/PlayGame'
import GameOver from './components/GameOver'
import Reset from './components/Reset'

function App() {
  const [id, setId] = useState('')
  const [guess, setGuess] = useState('')
  const [guessCount, setGuessCount] = useState(0)
  const [win , setWin] = useState(false)
  const [unique, setUnique] = useState(false)
  const [time , setTime] = useState(0)
  const [length, setLength] = useState(4)
  const [word, setWord] = useState('')
  const [gameStarted, setGameStarted] = useState(false)

  const setObject = {
    setId: setId,
    setGuess: setGuess,
    setGuessCount: setGuessCount,
    setWin: setWin,
    setUnique: setUnique,
    setTime: setTime,
    setWord: setWord,
    setLength: setLength,
    setGameStarted: setGameStarted
  }


  return (
    <>
        <div id="game">
          <StartGame gameStarted={gameStarted} setGameStarted={setGameStarted} setId={setId} length={length} setLength={setLength} setUnique={setUnique} unique={unique} />
          <PlayGame gameStarted={gameStarted} setWord={setWord} length={length} id={id} setGuess={setGuess} guess={guess} setGuessCount={setGuessCount} setWin={setWin} setTime={setTime} />
        </div>
        { win && <GameOver  word={word} guessCount={guessCount} id={id} unique={unique} win={win} setWin={setWin} time={time} length={length} setObject={setObject}/>}
        <Reset setObject={setObject}>Give up</Reset>
    </>
  )
}

export default App
