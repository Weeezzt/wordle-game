
export default function Reset({children, setObject}){

     function reset(){
        setObject.setTime(0)
        setObject.setGuess('')
        setObject.setGuessCount(0)
        setObject.setLength(4)
        setObject.setId('')
        setObject.setUnique(false)
        setObject.setGameStarted(false)
    }
    return (
        <>
            <button className='reset-button' onClick={reset}>{children}</button>
        </>
    )
}