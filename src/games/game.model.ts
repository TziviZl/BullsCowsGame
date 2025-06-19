import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema({
    guess: [Number],
    bulls: Number,
    cows: Number,
    createdAt: Date
});

const gameSchema = new mongoose.Schema({
    playerId: mongoose.Schema.Types.ObjectId,
    secretCode: [Number],
    status: String,
    maxAttempts: Number,
    winner: Boolean,
    attempts: { type: [attemptSchema], default: [] },
    createdAt: Date
});

export const GamesCollection = mongoose.model('GamesCollection', gameSchema);

