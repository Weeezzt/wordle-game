import { feedback } from '../scripts/start-game.js'


//Tests if the correct letter gets result correct
test('test so that it gives correct to correct letter in the guess', () => {
    expect(feedback('CYKLA', 'BÄNKA')).toContainEqual(
        { letter: 'A', result: 'correct' }
    )
})


//Tests so that if theres a guess with no correct letters it gives incorrect to all
test('Checks if every letter thats not there gets incorrect', () => {
    expect(feedback('CYKLA', 'RETUR')).toEqual([
        { letter: 'R', result: 'incorrect' },
        { letter: 'E', result: 'incorrect' },
        { letter: 'T', result: 'incorrect' },
        { letter: 'U', result: 'incorrect' },
        { letter: 'R', result: 'incorrect' }
    ])
})


//Tests so that a perfect guess gets all correct
test('cecks if a perfect guess gets everything correct', () => {
    expect(feedback('CYKLA', 'CYKLA')).toEqual([
        { letter: 'C', result: 'correct' },
        { letter: 'Y', result: 'correct' },
        { letter: 'K', result: 'correct' },
        { letter: 'L', result: 'correct' },
        { letter: 'A', result: 'correct' }
    ])
})


//Tests so that words that are in the word but at the wrong place gets result of misplaced
test('tests if misplaced works for letter at wrong position', () => {
    expect(feedback('BALEN', 'PELAD')).toEqual([
        { letter: 'P', result: 'incorrect' },
        { letter: 'E', result: 'misplaced' },
        { letter: 'L', result: 'correct' },
        { letter: 'A', result: 'misplaced' },
        { letter: 'D', result: 'incorrect' }
    ])
})


// If theres tests that if you have more of a specific letter than the word has, the extra letter gets incorrect
test('tests so that the extra letter gets incorrect', () => {
    expect(feedback('CYKLA', 'HALLÅ')).toEqual([
        { letter: 'H', result: 'incorrect' },
        { letter: 'A', result: 'misplaced' },
        { letter: 'L', result: 'incorrect' },
        { letter: 'L', result: 'correct' },
        { letter: 'Å', result: 'incorrect' }
    ])
})

//Tests so that if you have more of a letter than the word has, the extra letter gets incorrect but now with two correct ones
test('tests two corrects of same letter', () => {
    expect(feedback('BOLLA', 'LILLA')).toEqual([
        { letter: 'L', result: 'incorrect' },
        { letter: 'I', result: 'incorrect' },
        { letter: 'L', result: 'correct' },
        { letter: 'L', result: 'correct' },
        { letter: 'A', result: 'correct' }
    ])
})

//Tests a special case where there should be misplaced, correct and a incorrect result for the same letter
test('tests special case 1', () => {
    expect(feedback('TTTII', 'TIIIT')).toEqual([
        { letter: 'T', result: 'correct' },
        { letter: 'I', result: 'incorrect' },
        { letter: 'I', result: 'misplaced' },
        { letter: 'I', result: 'correct' },
        { letter: 'T', result: 'misplaced' }
    ])
})

//Tests another special case where there should be misplaced, correct and a incorrect result for the same letter
test('tests special case 2', () => {
    expect(feedback('TIIIT', 'TTTII')).toEqual([
        { letter: 'T', result : 'correct' },
        { letter: 'T', result: 'misplaced' },
        { letter: 'T', result: 'incorrect' },
        { letter: 'I', result: 'correct' },
        { letter: 'I', result: 'misplaced' }
    ])
})