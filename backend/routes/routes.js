import express from "express";
const router = express.Router();

import { HighScoreController, aboutUsController, wordleController } from '../controller/pages.js';

router.route('/aboutUs').get(aboutUsController);
router.route('/').get(wordleController);
router.route('/HighScore').get(HighScoreController);

export default router;