import getWordList from "../scripts/get-word.js";
import { feedback, chooseWord } from '../scripts/start-game.js';
import HighScore from '../models/highScoreSchema.js';
import Game from "../models/gameSchema.js";


export const aboutUsController = async (req, res) => {
    try {
        
        res.status(200).render('aboutUs')
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const wordleController = async (req, res) => {
    try {
        
        res.status(200).render('wordle')
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const HighScoreController = async (req, res) => {
    try {
        
        const highScoreFour = await HighScore.find({wordLength: 4}).sort({guesses: 1})
        const highScoreFive = await HighScore.find({wordLength: 5}).sort({guesses: 1})
        const highScoreSix = await HighScore.find({wordLength: 6}).sort({guesses: 1})
        console.log(highScoreFour, highScoreFive, highScoreSix)
        res.status(200).render('HighScore', { highScoreFour, highScoreFive, highScoreSix})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const getCorrectWord = async (req, res) => {
    try {
        const wordList = await getWordList();
        const length = req.query.length;
        const unique = req.query.unique;
        const word = chooseWord(wordList, length, unique)

        const game = new Game({
            word: word,
            StartTime: new Date()
        })

        await game.save()

        res.status(200).json({gameID: game._id })
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const addHighScore = async (req, res) => {
    try {
        const NewHighScore = await HighScore.create(req.body)
        res.status(200).json({ NewHighScore })
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const feedbackController = async (req, res) => {
    try {
        const gameId = req.body.gameID;
        const guess = req.body.guess;

        const game = await Game.findById(gameId)

        if (!game) {
            return res.status(404).json({ msg: 'Game not found' });
        }

        const newFeedback = feedback(game.word, guess)

        if (game.word === guess) {
            const endTime = new Date();
            const time = (endTime - game.StartTime) / 1000;
            return res.status(200).json({ newFeedback, time, word: game.word })
        }
        console.log(newFeedback)
        res.status(200).json({ newFeedback })
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const deleteHighScore = async (req, res) => {
    try {
        const id = req.params.id;
        await HighScore.findByIdAndDelete(id)
        res.status(200).json({msg: 'HighScore deleted'})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const deleteGame = async (req, res) => {
    try {
        const id = req.params.id;
        await Game.findByIdAndDelete(id)
        res.status(200).json({msg: 'Game deleted'})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const deleteEveryGame = async (req, res) => {
    try {
        const gameCount = await Game.countDocuments({})
        console.log(gameCount)

        const firstTenGames = await Game.find({}).limit(10)
        const firstTenGameIds = firstTenGames.map(game => game._id);

        if(gameCount > 20) {
            await Game.deleteMany({_id: {$in: firstTenGameIds}})
            res.status(200).json({msg: 'All games deleted'})
        } else {
            res.status(200).json({msg: 'No games to delete'})
        }
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}