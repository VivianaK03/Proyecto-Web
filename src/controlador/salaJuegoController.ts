import { Request, Response } from "express";
import { SalaJuegoResponse } from "../dto/salaJuegoDto";
import { SalaJuegoRepository } from "../repositorio/salaJuegoRepository";
import { SalaJuego } from "../entity/salaJuegoEntity";


export class SalaJuegoController {
    private salaJuegoRepository: SalaJuegoRepository = new SalaJuegoRepository();

    public getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const salaJuego: SalaJuego = await this.salaJuegoRepository.findById(Number(id));
            if (!salaJuego) {
                return res.status(404).json({ error: 'Esta sala de juego no existe' });
            }
            return res.status(200).json({ salaJuego });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };
    public getByEstado = async (req: Request, res: Response) => {
        try {
            const estado = req.params.estado; // Obtener el estado de los parámetros de la solicitud
            const salasJuego = await this.salaJuegoRepository.findByEstado(estado);
            res.status(200).json({ salasJuego });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    public getAll = async (req: Request, res: Response) => {
        try {
            const salasJuego: SalaJuego[] = await this.salaJuegoRepository.findAll();
            return res.status(200).json({ salasJuego });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };
    
    
    

    public save = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            const result: SalaJuego = await this.salaJuegoRepository.save(body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    public delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const existingSalaJuego = await this.salaJuegoRepository.findById(Number(id));
            if (!existingSalaJuego) {
                return res.status(404).json({ message: 'La sala de juego no existe en la base de datos' });
            }
            await this.salaJuegoRepository.delete(Number(id));
            return res.status(200).json({ message: 'Se ha eliminado la sala de juego exitosamente' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
