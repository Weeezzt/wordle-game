
export default function PlayGame({setObject, gameStarted, length, id, setGuess, guess, win, setWin, setGuessCount, setTime, setWord, guessListElement, setGuessListElement}) {

    function handleInputChange(event) {
        setGuess(event.target.value);
    }

    //Send the guess to the backend and get the feedback
    function guessHandler(){
        const newGuess = guess.toUpperCase()
        if(newGuess.length != length){
            return
        } 
        

        fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({guess: newGuess, gameID: id})
        })
        .then(response => response.json())
        .then(data => {
            setGuessListElement(prevGuesses => [...prevGuesses, data.newFeedback])
            console.log(data.newFeedback)
            setGuessCount(prevCount => prevCount + 1)
            if(data.time) {
                setTime(data.time)
                setWord(data.word)
                setWin(true)
            }
            setGuess('')
        })
        
    }

    //Reset the game
    function reset(){
        setObject.setTime(0)
        setObject.setGuess('')
        setObject.setGuessCount(0)
        setObject.setLength(4)
        setObject.setId('')
        setObject.setUnique(false)
        setObject.setGameStarted(false)

        setGuessListElement([])
    }

    

    
    
    return(
        <>
            <div className="game__game-body" id="game-body">
                <ul className="game__list">
                    {guessListElement.map((guess, guessIndex) => {
                        return(
                        <ul key={guessIndex} className="game__guess-list">
                        {guess.map((item, letterIndex) => {
                        const letter = item.letter;
                        const result = item.result;
                        const index = `${guessIndex}-${letterIndex}`
                        return(
                        <li key={index} className={`game__letter ${result === 'correct' ? 'green' : result === 'misplaced' ? 'yellow' : ''}`} >
                            {letter}   
                        </li>
                        )
                        })}
                    </ul>
                    )})}
                </ul>
            </div>
            <div className="game__guesses">
                <input type="text" className="guess-input" value={guess} maxLength={length} onChange={handleInputChange} disabled={!gameStarted} onKeyDown={(e) => e.key === 'Enter' ? guessHandler() : null}/>
                <button className="guess-button" onClick={guessHandler}  disabled={!gameStarted}>Guess</button>
            </div>
            <button className='reset-button' onClick={reset}>Give Up</button>
        </>
    )
}