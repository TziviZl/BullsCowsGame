import express from 'express';
import { signUp, login, leaderboard, recentGames, editPlayer, getPlayer, deletePlayer } from './player.service';
import { Types } from 'mongoose';
import {
    validatePlayerFields,
    validateLoginFields,
    validatePlayerIdParam
} from '../middleware/validateParameters';

const router = express.Router();

router.post('/signUp', validatePlayerFields, async (req, res) => {
    const { name, mail, password } = req.body;
    try {
        const player = await signUp(name, mail, password);
        res.status(201).json(player);
    } catch (err: any) {
        console.error('SIGNUP ERROR:', err);
        res.status(500).json({ error: 'Error signing up', message: err.message });
    }
});

router.post('/login', validateLoginFields, async (req, res) => {
    const { mail, password } = req.body;
    try {
        const player = await login(mail, password);
        res.status(200).json(player);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Error logging in', message: err.message });
    }
});

router.get('/leaderboard', async (req, res) => {
    try {
        const players = await leaderboard();
        res.status(200).json(players);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching leaderboard', message: err.message });
    }
});

router.get('/:playerId/recentGames', validatePlayerIdParam, async (req, res) => {
    const { playerId } = req.params;
    try {
        const games = await recentGames(new Types.ObjectId(playerId));
        res.status(200).json(games);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching recent games', message: err.message });
    }
});

router.put('/:playerId', validatePlayerFields, async (req, res) => {
    const { playerId } = req.params;
    const { name, mail, password } = req.body;
    try {
        const player = await editPlayer(new Types.ObjectId(playerId), name, mail, password);
        res.status(200).json(player);
    } catch (err: any) {
        console.error('EDIT ERROR:', err);
        res.status(500).json({ error: 'Error editing player', message: err.message });
    }
});

router.delete('/:playerId', validatePlayerIdParam, async (req, res) => {
    const { playerId } = req.params;
    try {
        const player = await deletePlayer(new Types.ObjectId(playerId));
        res.status(200).json({ message: 'Player deleted successfully', player });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting player', message: err.message });
    }
});

router.get('/:playerId', validatePlayerIdParam, async (req, res) => {
    const { playerId } = req.params;
    try {
        const player = await getPlayer(new Types.ObjectId(playerId));
        res.status(200).json(player);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching player', message: err.message });
    }
});

export default router;

