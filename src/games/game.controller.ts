import express from 'express';
import { endGame, start, statusGuesses, guess as guessService } from './game.service';
import { validateGuessFields, validateGamePlayerId } from '../middleware/validateGame';
import { validateGameStartFields } from '../middleware/validateParameters';

const router = express.Router();


router.post('/start', validateGameStartFields, async (req, res) => {
    const { name, password } = req.body;
    try {
        const gameId = await start(name, password);
        res.status(201).json({ gameId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error starting game' });
    }
});
router.post('/:gameId/guess', validateGuessFields, async (req, res) => {
    const guessArr = req.body.guess;
    const gameId = req.params.gameId;
    try {
        const result = await guessService(gameId, guessArr);
        res.status(200).json(result);
    } catch (err: any) {
        console.error('GUESS ERROR:', err); 
        res.status(500).json({ error: 'Error processing guess', message: err.message });
    }
});

router.get('/:gameId', async (req, res) => {
    const gameId = req.params.gameId;
    try {
        const gameStatus = await statusGuesses(gameId);
        res.status(200).json({ status: gameStatus.status, attempts: gameStatus.attempts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching game status' });
    }
});

router.post('/:gameId/end', async (req, res) => {
    const gameId = req.params.gameId;
    try {
        const game = await endGame(gameId);
        res.status(200).json(game);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error ending game' });
    }
});

export default router;

