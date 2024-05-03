import { Request, Response } from "express";
import { PalabraResponse } from "../dto/palabraDto";
import { PalabraRepository } from "../repositorio/palabraRepository";
import { Palabra } from "../entity/palabraEntity";

export class PalabraController {
    private palabraRepository: PalabraRepository = new PalabraRepository();

    public getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const palabra: Palabra = await this.palabraRepository.findById(Number(id));
            if (palabra === null) {
                res.status(404).json({ error: 'Esta palabra no existe' });
            }
            res.status(200).json({ palabra });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    public getByTexto = async (req: Request, res: Response) => {
        try {
            const texto = <string>req.query.texto;
            console.log(texto);
            const palabra: PalabraResponse = await this.palabraRepository.findByTexto(texto);
            return res.status(200).json({ palabra });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getAll = async (req: Request, res: Response) => {
        try {
            const palabras: Palabra[] = await this.palabraRepository.findAll();
            return res.status(200).json({ palabras });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    
    

    public save = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            // Verifica si la palabra ya existe en la base de datos
            const existingPalabra = await this.palabraRepository.findByTexto(body.texto);
            if (existingPalabra) {
                return res.status(400).json({ message: 'La palabra ya existe en la base de datos' });
            }
            
            // Guardar la nueva palabra en la base de datos
            const result: Palabra = await this.palabraRepository.save(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
    
    
    public update = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            const id = body.id;
            // Verifica si la palabra existe
            const existingPalabra = await this.palabraRepository.findById(id);
            if (!existingPalabra) {
                return res.status(404).json({ message: 'La palabra no existe en la base de datos' });
            }
            
            // Actualizar la palabra existente
            existingPalabra.texto = body.texto; // Actualiza el texto de la palabra
            const result: Palabra = await this.palabraRepository.save(existingPalabra);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    

    public delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            // Verifica si la palabra existe
            const existingPalabra = await this.palabraRepository.findById(Number(id));
            if (!existingPalabra) {
                // Si la palabra no existe, devuelve un mensaje de error
                return res.status(404).json({ message: 'La palabra no existe en la base de datos' });
            }
            
            // Si la palabra existe, se elimina de la base de datos
            await this.palabraRepository.delete(Number(id));
            return res.status(200).json({ message: 'Se ha eliminado la palabra exitosamente' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}    
