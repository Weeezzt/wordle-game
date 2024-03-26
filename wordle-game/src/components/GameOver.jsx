import { useState } from "react";

export default function GameOver({guessCount, word, unique, startTime, endTime}) {
    const [name, setName] = useState('');

    function handleSubmit() {
        const scoreInfo = {
            name: name,
            guesses: guessCount,
            time: ((endTime - startTime) / 1000).toFixed(2),
            unique: unique,
            wordLength: word.length,
            word: word
        };
        fetch('/api/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scoreInfo)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Succces', data);
            window.location.reload()
        })
    }

    function handleName(e) {
        setName(e.target.value);
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
                    <input name="name" type="text" className="game-over-input" required onChange={handleName}/>
                    <button className="game-over-button" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    )
}