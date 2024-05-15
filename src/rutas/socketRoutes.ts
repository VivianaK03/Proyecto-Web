import { SalaJuegoRepository } from "../repositorio/salaJuegoRepository";
const express = require('express');
const router = express.Router();

module.exports = (expressWs) => {
    const salaJuegoRepository = new SalaJuegoRepository();
    expressWs.applyTo(router);
    const rooms = {};
    const words = ['perro', 'gato', 'casa', 'auto', 'computadora'];

    router.ws('/room/:roomName/:userName/:avatar', (ws, req) => {
        const roomName = req.params.roomName;
        const userName = req.params.userName;
        const avatar = req.params.avatar;

        // Metodo para agregar palabra random a la sala
        function selectWordRandow(roomName) {
            rooms[roomName].word = words[Math.floor(Math.random() * words.length)];
        }

        // Método para unirse a la sala
        function joinRoom(ws, roomName, userName, avatar) {
            if (!rooms[roomName]) {
                rooms[roomName] = {
                    players: new Set(),
                    currentPlayer: null,
                    word: ""
                };
            }
            rooms[roomName].players.add({ ws, userName, avatar });
            if (!rooms[roomName].currentPlayer) {
                rooms[roomName].currentPlayer = { userName, ws };
            }
            // Asignar palabra una sola vez por sala
            if (rooms[roomName].word === "") {
                selectWordRandow(roomName);
            }
        }

        // Método para notificar al jugador en turno y a los demás jugadores
        function notifyPlayers(roomName) {
            const currentPlayer = rooms[roomName].currentPlayer;
            const word = rooms[roomName].word;
            rooms[roomName].players.forEach(client => {
                if (client.ws.readyState === ws.OPEN) {
                    if (client.userName === currentPlayer.userName) {
                        client.ws.send(`¡Es tu turno! La palabra a dibujar es: ${word}`);
                    } else {
                        client.ws.send(`El jugador ${currentPlayer.userName} está dibujando.`);
                    }
                }
            });
        }

        // Metodo para adivinar la palabra 
        function guessWord(roomName, userName, word) {
            // Puntaje
            let score = 0;

            // Calcular el puntaje en base a el tiempo que tardó en adivinar la palabra
            // y la longitud de la palabra
            const time = 0;
            const wordLength = rooms[roomName].word.length;
            if (time < 10) {
                score = wordLength * 10;
            } else {
                score = wordLength * 5;
            }

            // Notificar a los jugadores si la palabra es correcta
            if (rooms[roomName].word === word) {
                rooms[roomName].players.forEach(client => {
                    if (client.ws.readyState === ws.OPEN) {
                        // Notificar al jugador que adivinó la palabra y su puntaje
                        if (client.userName === userName) {
                            // Enviar mensaje al jugador que adivinó la palabra
                            client.ws.send(`¡Felicidades! Adivinaste la palabra. Puntaje: ${score}`);
                            // Enviar mensaje a los demás jugadores
                            client.ws.send(`La palabra era: ${rooms[roomName].word} , el turno ha finalizado.`);
                            // Asignar nueva palabra
                            selectWordRandow(roomName);
                            // Asignar el turno a la siguiente persona 
                            const playerArray: { userName: string }[] = Array.from(rooms[roomName].players);
                            const currentPlayerIndex = playerArray.findIndex(player => player.userName === userName);
                            const nextPlayerIndex = (currentPlayerIndex + 1) % playerArray.length;
                            rooms[roomName].currentPlayer = playerArray[nextPlayerIndex];
                        }
                        // Notificar a los demás jugadores que alguien adivinó la palabra
                        else {
                            client.ws.send(`El jugador ${userName} ha adivinado la palabra. Puntaje: ${score}`);
                            client.ws.send(`El TURNO HA FINALIZADO`);

                            notifyPlayers(roomName)
                        }
                    }
                });
            } else {
                // La palabra que intestaste adivinar no es correcta envia mensaje a la persona que inteta adivinar
                ws.send(`La palabra ${word} no es correcta.`);
            }
        }

        // Unirse a la sala
        joinRoom(ws, roomName, userName, avatar);

        // Enviar mensaje de bienvenida al nuevo jugador
        ws.send(`Bienvenido a la sala: ${roomName}!`);

        // Notificar a los demás jugadores que un nuevo jugador se ha unido
        if (rooms[roomName]) {
            rooms[roomName].players.forEach(client => {
                if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                    client.ws.send(`El jugador ${userName}, con avatar ${avatar} se ha unido a la sala.`);
                }
            });
        }

        // Notificar a los jugadores sobre el cambio de turno y la nueva palabra
        notifyPlayers(roomName);

        // Notificar a los jugadores sobre el cambio de turno y la nueva palabra
        ws.on('message', async function (msg) {
            const jsonMessage = JSON.parse(msg);
            if (jsonMessage.type === 'SEND_MESSAGE') {
                if (rooms[roomName]) {
                    rooms[roomName].players.forEach(client => {
                        if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                            client.ws.send(`${userName} dice: ${jsonMessage.data}`);
                        }
                    });
                }
            }
            // Adivinar palabra
            if (jsonMessage.type === 'GUESS_WORD') {
                guessWord(roomName, userName, jsonMessage.data);
            }
            // Cambiar de turno
            else if (jsonMessage.type === 'FINISH_TURN') {
                // Cambiar de turno
                const playerArray: { userName: string }[] = Array.from(rooms[roomName].players);
                const currentPlayerIndex = playerArray.findIndex(player => player.userName === userName);
                const nextPlayerIndex = (currentPlayerIndex + 1) % playerArray.length;
                rooms[roomName].currentPlayer = playerArray[nextPlayerIndex];
                rooms[roomName].word // Asignar nueva palabra
                // Notificar a los jugadores sobre el cambio de turno y la nueva palabra
                notifyPlayers(roomName);
            }
        });

        // Notificar a los jugadores sobre el cambio de turno y la nueva palabra
        ws.on('close', function () {
            rooms[roomName].players.delete(ws);
            if (rooms[roomName].players.size === 0) {
                delete rooms[roomName];
            } else if (rooms[roomName].currentPlayer.ws === ws) {
                // Si el jugador que estaba en turno se desconecta,
                // asignar el turno al siguiente jugador en la lista
                const newCurrentPlayer = Array.from(rooms[roomName].players)[0];
                rooms[roomName].currentPlayer = newCurrentPlayer;
                // Notificar a los jugadores sobre el cambio de turno
                notifyPlayers(roomName);
            }
        });
    });

    return router;
};