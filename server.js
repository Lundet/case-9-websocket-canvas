import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const port = 8081;

// statiska filer
app.use(express.static('public'));

// skapa en server
const server = http.createServer(app);

// skapa en websocket server
const wss = new WebSocketServer({ noServer: true });

// ... handskakning - upgrade required
server.on('upgrade', (req, socket, head) => {
    console.log("client upgrade required");

    // starta websocket
    wss.handleUpgrade(req, socket, head, (ws) => {
        console.log(`Client agent: ${req.headers['user-agent']}`);

        // skicka vidare
        wss.emit('connection', ws, req);
    });
});


// lyssna på event 'connection'
wss.on('connection', (ws) => {
    console.log(`Client connected to server, number of clients: ${wss.clients.size}`);

    ws.on('close', () => {
        console.log(`Client left, number of remaining clients: ${wss.clients.size}`);
    });

    ws.on('message', (data) => {
        // console.log("data", data);
        // omvandla 'data' till json
        const obj = JSON.parse(data);
        console.log("obj", obj);

        broadcastExclude(wss, obj, ws);
    });

});

server.listen(port, (req, res) => {
    console.log(`server running on port ${port}`);
});

//functions

// en funktion för att skicka meddelande till ALLA
function broadcast(wss, obj) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(obj));
    });
}
// en funktion för att skicka meddlande till ALLA utom aktuell client
function broadcastExclude(wss, obj, ws) {
    wss.clients.forEach(client => {
        console.log("A");
        if (client !== ws) {
            client.send(JSON.stringify(obj));
        }
    });
}
