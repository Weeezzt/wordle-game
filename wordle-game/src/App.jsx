import { useState } from 'react'
import StartGame  from './components/StartGame'
import './App.css'
import PlayGame from './components/PlayGame'
import GameOver from './components/GameOver'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [word, setWord] = useState('')
  const [guess, setGuess] = useState('')
  const [guessCount, setGuessCount] = useState(0)
  const [win , setWin] = useState(false)
  const [unique, setUnique] = useState(false)
  const [startTime , setStartTime] = useState(0)
  const [endTime , setEndTime] = useState(0)


  return (
    <>
        <Header />
        <div id="game">
          <StartGame setWord={setWord} setUnique={setUnique} unique={unique} setStartTime={setStartTime}/>
          <PlayGame word={word} setGuess={setGuess} guess={guess} setGuessCount={setGuessCount} setWin={setWin} setEndTime={setEndTime}/>
        </div>
        { win && <GameOver  guessCount={guessCount} word={word} unique={unique} setWin={setWin} startTime={startTime} endTime={endTime}/>}
        <Footer />
    </>
  )
}

export default App
