import { Types } from "mongoose";
import { getRandom4DigitNumber } from "./game.logic";
import { GamesCollection } from './game.model'; 
import { Player } from '../players/player.model';

export async function start(playerName: string, password: string): Promise<Types.ObjectId> {
    const player = await Player.findOne({ name: playerName, password });
    if (!player) {
        throw new Error("Player not found");
    }
    const secretCode = getRandom4DigitNumber().toString().split('').map(Number);
    console.log("Secret Code:", secretCode);
    const game = new GamesCollection({
        playerId: player._id, 
        secretCode: secretCode,
        status: 'in-progress',
        maxAttempts: 10,
        createdAt: new Date()
    });
    await game.save();
    return game._id;
}


export async function guess(gameId: Types.ObjectId, guess: number[]): Promise<any> {
    if (!gameId || !guess || guess.length !== 4) {
        throw new Error("Game ID and a valid 4-digit guess are required");
    }

    const game = await GamesCollection.findById(gameId);
    if (!game) {
        throw new Error("Game not found");
    }

    if (game.status !== 'in-progress') {
        throw new Error("Game is not in progress");
    }

    const bulls = guess.filter((digit, index) => digit === game.secretCode[index]).length;
    const cows = guess.filter(digit => game.secretCode.includes(digit)).length - bulls;

    const attempt = {
        guess: guess,
        bulls: bulls,
        cows: cows,
        createdAt: new Date()
    };

    game.attempts.push(attempt);

    let gameEnded = false;
    let playerWon = false;

    if (bulls === 4) {
        game.status = 'won';
        game.winner = true;
        gameEnded = true;
        playerWon = true;
    } else if (game.attempts.length >= game.maxAttempts) {
        game.status = 'lost';
        game.winner = false;
        gameEnded = true;
    }

    await game.save();

    // עדכון סטטיסטיקות שחקן רק בסיום משחק
    if (gameEnded) {
        await Player.findByIdAndUpdate(
            new Types.ObjectId(game.playerId),
            {
                $inc: {
                    totalGames: 1,
                    ...(playerWon ? { wins: 1 } : {})
                }
            }
        );
    }

    return { status: game.status, attempt };
}

export async function statusGuesses(gameId: Types.ObjectId): Promise<any> {
    if (!gameId) {
        throw new Error("Game ID is required");
    }

    const game = await GamesCollection.findById(gameId);
    if (!game) {
        throw new Error("Game not found");
    }

    return {
        status: game.status,
        attempts: game.attempts,
    };
}

export async function endGame(gameId: Types.ObjectId): Promise<any> {
    const game = await GamesCollection.findById(gameId);
    if (!game) {
        throw new Error("Game not found");
    }

    console.log('playerId:', game.playerId);

    if (game.status === 'won') {
        await Player.findByIdAndUpdate(new Types.ObjectId(game.playerId), { $inc: { wins: 1 } });
    }

    game.status = 'ended';
    await game.save();
    return { message: "Game ended successfully" };
}


