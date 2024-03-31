import { useState } from "react";

export default function PlayGame({word, setGuess, guess, setWin, setGuessCount, setEndTime}) {
    const [guessListElement, setGuessListElement] = useState([])
    const [won, setWon] = useState(false)
    const length = word.length

    function handleInputChange(event) {
        setGuess(event.target.value);
    }

    function guessHandler(){
        const newGuess = guess.toUpperCase()

        fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({guess: newGuess, word: word})
        })
        .then(response => response.json())
        .then(data => {
            setGuessListElement(prevGuesses => [...prevGuesses, data.newFeedback])
            setGuessCount(prevCount => prevCount + 1)
            if(newGuess === word && newGuess !== ''){
                setWin(true)
                setWon(true)
                setEndTime(Date.now())
            } 
            setGuess('')
        })
        
    }

    

    
    
    return(
        <>
            <div className="game__game-body" id="game-body">
                <ul className="game__list">
                    {guessListElement.map((guess, guessIndex) => {
                        return(
                        <ul key={guessIndex} className="game__guess-list">
                        {guess.map((item, letterIndex) => {
                        const letter = Object.keys(item)[0];
                        const index = `${guessIndex}-${letterIndex}`
                        return(
                        <li key={index} className={`game__letter ${item[letter] === 'correct' ? 'green' : item[letter] === 'misplaced' ? 'yellow' : ''}`} >
                            {letter}   
                        </li>
                        )
                        })}
                    </ul>
                    )})}
                </ul>
            </div>
            <div className="game__guesses">
                <input type="text" className="guess-input" value={guess} maxLength={length} onChange={handleInputChange} disabled={won} onKeyDown={(e) => e.key === 'Enter' ? guessHandler() : null}/>
                <button className="guess-button" onClick={guessHandler}  disabled={won}>Guess</button>
            </div>
        </>
    )
}