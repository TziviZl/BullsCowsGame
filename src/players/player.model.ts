import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true,
    unique: true
  },
  totalGames: {
    type: Number,
    default: 0
  },
  wins: {
    type: Number,
    default: 0
  }
});

export const Player = mongoose.model('Players', playerSchema);