import { SalaJuegoRepository } from "../repositorio/salaJuegoRepository";

const express = require('express');
const router = express.Router();
module.exports = (expressWs) => {
    
    const salaJuego = new SalaJuegoRepository();
    expressWs.applyTo(router);

    const rooms = {};

    router.ws('/room/:roomName', (ws, req) => {
        const roomName = req.params.roomName;
        const userName = req.headers.username;
        if (!rooms[roomName]) {
            rooms[roomName] = new Set();
        }
        rooms[roomName].add({ws, userName});
        ws.send(`Welcome to room ${roomName}!`);
        //Notificar a todos que me uní
        if (rooms[roomName]) {
            rooms[roomName].forEach(client => {
                if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                  console.log(ws.OPEN);
                    client.ws.send(`${userName} has joined`);
                }
            });
        }
        ws.on('message', async function(msg) {
            const jsonMessage: {type: string, data: any} = JSON.parse(msg);
            if(jsonMessage.type === 'SEND_MESSAGE'){
                if (rooms[roomName]) {
                    rooms[roomName].forEach(client => {
                        if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                          console.log(ws.OPEN);
                            client.ws.send(`${userName} Says: ${jsonMessage.data}`);
                        }
                    });
                }
            }if(jsonMessage.type === 'FINISH_TURN'){
                const salaJuegoRepository = new SalaJuegoRepository();
                const songs = await salaJuegoRepository.getAll();
                if (rooms[roomName]) {
                    rooms[roomName].forEach(client => {
                        if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                          console.log(ws.OPEN);
                            client.ws.send(JSON.stringify(songs));
                        }
                    });
                }
            }
            
        });
        ws.on('close', function() {
            rooms[roomName].delete(ws);
            if (rooms[roomName].size === 0) {
                delete rooms[roomName];
            }
        });
    });

    

    return router;
};