export class SalaJuegoResponse {
    id: number;
    nombre: string;
    estado: string;
    categoria: {
        nombre: string; // Solo el nombre de la categoría
    };
    
}
