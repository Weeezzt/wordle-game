

export default function GameOver({guessCount, word, unique, setWin, startTime, endTime}) {

    function handleSubmit() {
        window.location.reload();
    }

    return (
        <>
            
            <div id="game-over">
                <h1>Congratulations</h1>
                <ul className='game-over-list'>
                    <li className='game-over-li'>You have guessed the word in {guessCount} guesses</li>
                    <li className='game-over-li'>This took you {((endTime - startTime) / 1000).toFixed(2)} seconds</li>
                    <li className='game-over-li'>Unique letter: {unique ? 'yes' : 'no'}</li>
                    <li className='game-over-li'>The length of the word: {word.length}</li>
                    <li className='game-over-li'>The word: {word}</li>
                </ul>
                <div className="submit-div">
                    <label htmlFor="name">Enter name</label>
                    <input name="name" type="text" className="game-over-input" required />
                    <button className="game-over-button" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    )
}