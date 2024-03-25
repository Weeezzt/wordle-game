import { chooseWord, fetchWordList } from "../js/start-game";
import { useEffect, useState } from "react";

export default function StartGame({setWord, setUnique, unique, setStartTime}) {
    const [gameStarted, setGameStarted] = useState(false)
    const [heading, setHeading] = useState('')
    const [length, setLength] = useState(4)
    const [wordList, setWordList] = useState([])

    useEffect(()=> {
        fetchWordList().then(wordList => {
            setWordList(wordList)
        })
    }, [])

    function handleChange (e) {
        setLength(e.target.value)
        console.log(length)
    }
    function handleChangeUnique() {
        setUnique(!unique);
    }
    function radioClickHandler() {
        setUnique(!unique)
    }

    let header = <h1 className='game__header'>{heading}</h1>
    function startingGameHandler() {
        
        console.log(wordList)
        const word = chooseWord(wordList, length, unique)
        console.log(word)
        setGameStarted(true)
        setWord(word)
        setHeading('Wordle has begun')
        header = <h1 className='game__header'>{heading}</h1>
        setStartTime(Date.now())
    }

    

    return(
        <>
        {header}
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