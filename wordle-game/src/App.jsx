import { useState } from 'react'
import StartGame  from './components/StartGame'
import './App.css'
import PlayGame from './components/PlayGame'
import GameOver from './components/GameOver'

function App() {
  const [word, setWord] = useState('')
  const [guess, setGuess] = useState('')
  const [guessCount, setGuessCount] = useState(0)
  const [win , setWin] = useState(false)
  const [unique, setUnique] = useState(false)


  return (
    <>
        <div id="game">
          <StartGame setWord={setWord} setUnique={setUnique} unique={unique}/>
          <PlayGame word={word} setGuess={setGuess} guess={guess} setGuessCount={setGuessCount} setWin={setWin} />
        </div>
        { win && <GameOver  guessCount={guessCount} word={word} unique={unique}/>}
    </>
  )
}

export default App
