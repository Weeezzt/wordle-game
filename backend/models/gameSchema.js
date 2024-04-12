import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    word: { type: String, required: true },
    StartTime: { type: Date, required: true },
});

const Game = mongoose.model("games", gameSchema);

export default Game;
