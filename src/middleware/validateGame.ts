import { Request, Response, NextFunction } from 'express';

export function validateGuessFields(req: Request, res: Response, next: NextFunction) {
    const { guess } = req.body;
    if (
        !Array.isArray(guess) ||
        guess.length !== 4 ||
        !guess.every(num => typeof num === 'number')
    ) {
        return res.status(400).json({ error: "guess must be an array of 4 numbers" });
    }
    const uniqueDigits = new Set(guess);
    if (uniqueDigits.size !== guess.length) {
        return res.status(400).json({ error: "Each digit in guess must be unique" });
    }
    next();
}

export function validateGamePlayerId(req: Request, res: Response, next: NextFunction) {
    const { playerId } = req.body;
    if (!playerId) {
        return res.status(400).json({ error: "playerId is required in body" });
    }
    next();
}