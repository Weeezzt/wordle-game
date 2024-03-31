

const chooseWord = (wordList, wordLength, uniqueLetters) => {
    // Creating some backup words to use if the wordList is empty
    const BACKUPFIVE = ['KRAFT', 'BLINK', 'KLUNG', 'TRAMP', 'BRICK', 'FLYKT', 'GRANS', 'SKYLT', 'PRICK'];
    const BACKUPFOUR = ['KANT', 'HUND', 'FISK', 'HÄST', 'BOKS', 'STOL', 'BORD', 'FORT', 'BILA'];
    const BACKUPSIX = ['SPRINT', 'TRÄDGA', 'FLYKTA', 'SKYLTA', 'PRICKA', 'LUFTIG'];

    // Filtering the wordList to only contain words with the correct length
    wordList = wordList.map(word => word.toUpperCase())
    wordLength = parseInt(wordLength)
    wordList = wordList.filter(word => word.length === wordLength)

    // If uniqueLetters is true, filter the wordList to only contain words with unique letters
    if(uniqueLetters) {
        wordList.forEach(word => {
           
           for (let i = 0; i < word.length; i++) {
                for (let j = i + 1; j < word.length; j++) {
                    if(word[i] === word[j]) {
                        wordList.splice(wordList.indexOf(word), 1)
                    }
                }

           }
        })
    }

    // If the wordList is empty, return a random word from the backup list
    if(wordList.length === 0) {
        if(wordLength === 4) {
            return BACKUPFOUR[Math.floor(Math.random() * BACKUPFOUR.length)]
        }
        else if(wordLength === 5) {
            return BACKUPFIVE[Math.floor(Math.random() * BACKUPFIVE.length)]
        }
        else {
            return BACKUPSIX[Math.floor(Math.random() * BACKUPSIX.length)]
        }
    }

    // Return a random word from the wordList
    return wordList[Math.floor(Math.random() * wordList.length)]

    
}

const feedback = (word, guess) => {
    // Throw error if word and guess are not the same length
    if(word.length !== guess.length) {
        throw new Error('Word and guess must be the same length')
    }

    //Declaring some variables
    let result = []
    const wordCount = {}
    const guessCount = {}

    //Splitting the word and guess into arrays and converting to uppercase
    const wordArr = word.toUpperCase().split('')
    const guessArr = guess.toUpperCase().split('')

    //Counting the number of each letter in the word and guess
    wordArr.forEach(letter => wordCount[letter] = (wordCount[letter] || 0) + 1);
    guessArr.forEach(letter => guessCount[letter] = (guessCount[letter] || 0) + 1);

    //Checking for correct letters in correct position
    for(let i = 0; i < wordArr.length; i++) {
        if(guessArr[i] === wordArr[i]) {
            result.push({ [guessArr[i]]: 'correct' })
            wordCount[guessArr[i]]--
            guessCount[guessArr[i]]--

            //if the letter count is below zero then one misplaced letter should be incorrect instead, so we change it
            if(wordCount[guessArr[i]] < 0){
                result.find(obj => obj[guessArr[i]] === 'misplaced')[guessArr[i]] = 'incorrect'
            }

          //Checking for correct letters in incorrect position  
        } else if(wordCount[guessArr[i]] > 0) {
            result.push({ [guessArr[i]]: 'misplaced' })
            wordCount[guessArr[i]]--
            guessCount[guessArr[i]]--
        } else {
            result.push({ [guessArr[i]]: 'incorrect' })
        }
    } 

    return result
}

const fetchWordList = async () => {
    const respone = await fetch('/api/words')
    const data = await respone.json()
    const wordList = data.wordList
    return wordList
}


export { chooseWord, feedback, fetchWordList }