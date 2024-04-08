import { useState } from "react";

export default function GameOver({setGuessListElement, setObject, word, guessCount, unique, time, length}) {
    const [name, setName] = useState('');

    function handleSubmit() {
        const scoreInfo = {
            name: name,
            guesses: guessCount,
            time: time.toFixed(2),
            unique: unique,
            wordLength: length,
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
            setObject.setTime(0);
            setObject.setGuess('');
            setObject.setGuessCount(0);
            setObject.setLength(4);
            setObject.setId('');
            setObject.setUnique(false);
            setObject.setGameStarted(false);

            setGuessListElement([]);
            setName('')

        })

        fetch('/api/delete/all', {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Deleted all', data);
        })
    }

    function handleName(e) {
        setName(e.target.value);
    }


    return (
        <>          
            <div id="game-over" style={time === 0 ? { display: 'none' }: {}}>
                <h1>Congratulations</h1>
                <ul className='game-over-list'>
                    <li className='game-over-li'>The word was {word}</li>
                    <li className='game-over-li'>You have guessed the word in {guessCount} guesses</li>
                    <li className='game-over-li'>This took you {time.toFixed(2)} seconds</li>
                    <li className='game-over-li'>Unique letter: {unique ? 'yes' : 'no'}</li>
                    <li className='game-over-li'>The length of the word: {length}</li>
                </ul>
                <form className="submit-div" onSubmit={e => { e.preventDefault(); if (name != '')   handleSubmit(); }}>
                    <label htmlFor="name">Enter name</label>
                    <input name="name" value={name} type="text" className="game-over-input" required onChange={handleName}/>
                    <button className="game-over-button" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}