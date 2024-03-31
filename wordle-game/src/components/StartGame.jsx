
import { chooseWord, fetchWordList } from "../js/start-game";
import { useEffect, useState } from "react";

export default function StartGame({setWord, setUnique, unique, setStartTime}) {
    const [gameStarted, setGameStarted] = useState(false)
    const [heading, setHeading] = useState('')
    const [length, setLength] = useState(4)

    function handleChange (e) {
        setLength(e.target.value)
    }
    function handleChangeUnique() {
        setUnique(!unique);
    }
    function radioClickHandler() {
        setUnique(!unique)
    }

    let header = <h1 className='game__header'>{heading}</h1>
    function startingGameHandler() {
        fetch(`/api/words?length=${length}&unique=${unique}`)
        .then(response  => response.json())
        .then(data => {
            console.log(data)
            setWord(data.word)
            setGameStarted(true)
        })
        setHeading('Wordle has begun')
        setStartTime(Date.now())
    }

    

    return(
        <>
        <h1 className='game__header'>{heading}</h1>
        <div className="game__game-nav" id="game-header">
            <label htmlFor="length">Word length</label>
            <input  type="number" min="4" max="6" className="game__drop-down" name="length" value={length} onChange={handleChange} disabled={gameStarted}/>
            <label htmlFor="radio" >Unique letters</label>
            <input checked={unique} type="radio" className="game__radio" name="radio" onChange={handleChangeUnique} onClick={radioClickHandler} disabled={gameStarted}/>
            <button className="game__button" onClick={startingGameHandler} disabled={gameStarted}>Start</button>
          </div>
        </>
        
    )
}