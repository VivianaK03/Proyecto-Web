import { SalaJuegoController } from "../controlador/salaJuegoController";


const WebSocket = require('ws');
export class SocketController{
  static rooms = {};
  static roundCounters = {}; // Contador de rondas para cada sala
  static MAX_ROUNDS = 5; // Número máximo de rondas

  joinRoom(ws, roomName) {
      if (!SocketController.rooms[roomName]) {
          SocketController.rooms[roomName] = new Set();
      }
      SocketController.rooms[roomName].add(ws);
  }
  
  leaveRoom(ws, roomName) {
      if (SocketController.rooms[roomName]) {
          this.sendMessageToRoom(roomName, 'Un usuario se ha ido');
          SocketController.rooms[roomName].delete(ws);
          ws.close();
          if (SocketController.rooms[roomName].size === 0) {
              delete SocketController.rooms[roomName];
              delete SocketController.roundCounters[roomName]; // Eliminar contador de rondas
          }
      }
  }
  
  sendMessageToRoom(roomName, message) {
      if (SocketController.rooms[roomName]) {
          for (const client of SocketController.rooms[roomName]) {
              if (client.readyState === WebSocket.OPEN) {
                  client.send(message);
              }
          }
      }
  }
  
  asignarTurno(roomName, jugadorEnTurno) {
      if (!SocketController.rooms[roomName]) {
          return; // La sala no existe
      }
      
      // Incrementar el contador de rondas
      if (!SocketController.roundCounters[roomName]) {
          SocketController.roundCounters[roomName] = 0;
      }
      SocketController.roundCounters[roomName]++;
      
      // Verificar si se ha alcanzado el número máximo de rondas
      if (SocketController.roundCounters[roomName] >= SocketController.MAX_ROUNDS) {
          // Si se han jugado el número máximo de rondas, finalizar el juego
          // Aquí puedes agregar código para calcular y mostrar los resultados del juego
          // Y emitir un evento de socket para notificar a los clientes que el juego ha terminado
          this.sendMessageToRoom(roomName, 'El juego ha finalizado. Aquí están los resultados: ...');
          
          // Reiniciar el contador de rondas para el próximo juego
          SocketController.roundCounters[roomName] = 0;
      }      
    
    }
}