import express, { Request, Response }  from 'express';
import player  from './players/player.controller';
import game from './games/game.controller';
import {connectToDb} from './db/connection';

const app = express();
app.use(express.json());
connectToDb();

app.use('/api/players', player);
app.use('/api/games', game);

app.use((err, req, res, next) => {
    res.status(500).send('משהו השתבש!');
});
export default app;



