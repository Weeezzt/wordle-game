import express from "express";
const router = express.Router();

import { HighScoreController, aboutUsController, wordleController, getCorrectWord, addHighScore, feedbackController } from '../controller/pages.js';

router.route('/aboutUs').get(aboutUsController);
router.route('/').get(wordleController);
router.route('/HighScore').get(HighScoreController);
router.route('/api/words').get(getCorrectWord);
router.route('/api/scores').post(addHighScore);
router.route('/api/feedback').post(feedbackController);
export default router;