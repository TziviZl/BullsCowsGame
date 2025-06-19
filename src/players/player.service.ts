import { Player } from './player.model';
import { Types } from 'mongoose'; 
import { GamesCollection } from '../games/game.model'; 

export async function signUp(name: String, mail: String, password: String): Promise<any> {
    console.log('SIGNUP PARAMS:', { name, mail, password });
    const existingPlayer = await Player.findOne({ mail });
    console.log('EXISTING PLAYER:', existingPlayer);
    if (existingPlayer) {
        throw new Error("Email already registered");
    }
    const newPlayer = new Player({ name, mail, password, totalGames: 0, wins: 0 });
    await newPlayer.save();
    return newPlayer;
}

export async function login(mail: string, password: string): Promise<any> {
    const player = await Player.findOne({ mail });
    if (!player) {
        throw new Error("You have to sign up first.");
    }
    if (player.password !== password) {
        throw new Error("Incorrect password.");
    }
    return player;
}
export async function getPlayer(playerId: Types.ObjectId): Promise<any> {
    if (!playerId) {
        throw new Error("Player ID is required");
    }
    const player = await Player.findById(playerId);
    if (!player) {
        throw new Error("Player not found");
    }
    return player;
}

export async function recentGames(playerId: Types.ObjectId | string): Promise<any> {
    if (!playerId) {
        throw new Error("Player ID is required");
    }
    const games = await GamesCollection.find({ playerId: new Types.ObjectId(playerId) })
        .sort({ createdAt: -1 })
        .limit(5);
    return games;
}

export async function leaderboard (): Promise<any> 
{
    const players = await Player.find()
        .sort({ wins: -1, totalGames: -1 })
        .limit(10);
    return players;
}

export async function editPlayer(playerId: Types.ObjectId, name: String, mail: String, password: String): Promise<any>
{
    const player = await Player.findByIdAndUpdate(playerId, { name, mail, password }, { new: true });
    if (!player) {
        throw new Error("Player not found");
    }
    return player;
}


export async function deletePlayer(playerId: Types.ObjectId): Promise<any> 
{
    if(!playerId) {
        throw new Error("playerId is required");
    }
    const player = await Player.findOneAndDelete(playerId);
    if (!player) {
        throw new Error("Player not found");
    }
    return player;
}

