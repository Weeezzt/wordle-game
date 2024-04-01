import mongoose from 'mongoose';

const highScoreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    guesses: { type: Number, required: true },
    time: { type: Number, required: true },
    unique: { type: Boolean, required: true },
    wordLength: { type: Number, required: true },
    word: { type: String, required: true }
})

const HighScore = mongoose.model('highscores', highScoreSchema);

export default HighScore;


