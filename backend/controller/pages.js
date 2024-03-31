import getWordList from "../scripts/get-word.js";
import { feedback, chooseWord } from '../scripts/start-game.js';

const highScores = []


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
        console.log(highScores)
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

        const highScore = req.body;

        highScores.push(highScore);
        console.log(highScores)
        res.status(200).json({ highScore })
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