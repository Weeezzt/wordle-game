
export default function StartGame({gameStarted, setGameStarted, length, setLength, setId, setUnique, unique}) {

    function handleChange (e) {
        setLength(e.target.value)
    }
    function handleChangeUnique() {
        setUnique(!unique);
    }
    function radioClickHandler() {
        setUnique(!unique)
    }

    let heading = 'Wordle'

    function startingGameHandler() {
        fetch(`/api/words?length=${length}&unique=${unique}`)
        .then(response  => response.json())
        .then(data => {
            setId(data.gameID)
            setGameStarted(true)
        })
    }

    

    return(
        <>
        <h1 className='game__header'>{gameStarted ? 'Make your guess' : heading}</h1>
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