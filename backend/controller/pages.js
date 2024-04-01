import getWordList from "../scripts/get-word.js";
import { feedback, chooseWord } from '../scripts/start-game.js';
import HighScore from '../models/highScoreSchema.js';


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
        const highScores = await HighScore.find({})
        res.status(200).render('HighScore', { highScores })
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
        res.status(200).json({ word })
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
        const word = req.body.word;
        const guess = req.body.guess;

        const newFeedback = feedback(word, guess)
        res.status(200).json({ newFeedback })
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}