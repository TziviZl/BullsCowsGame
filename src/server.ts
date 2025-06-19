import app from './app';
const http = require('http');


const port = process.env.PORT || 3001;

const server = http.createServer(app);

// שמיעה על הפורט
server.listen(port, () => {
    console.log(`השרת פועל בפורט ${port}`);
});