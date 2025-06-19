import { Request, Response, NextFunction } from 'express';

export function validatePlayerFields(req: Request, res: Response, next: NextFunction) {
    const { name, mail, password } = req.body;
    if (!name || !mail || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    next();
}

export function validateLoginFields(req: Request, res: Response, next: NextFunction) {
    const { mail, password } = req.body;
    if (!mail || !password) {
        return res.status(400).json({ error: "Mail and password are required" });
    }
    next();
}

export function validatePlayerIdParam(req: Request, res: Response, next: NextFunction) {
    const { playerId } = req.params;
    if (!playerId) {
        return res.status(400).json({ error: "playerId param is required" });
    }
    next();
}


export function validateGameStartFields(req: Request, res: Response, next: NextFunction) {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({ error: "name and password are required" });
    }
    next();
}