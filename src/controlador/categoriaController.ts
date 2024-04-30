import { Request, Response } from "express";
import { CategoriaRepository } from "../repositorio/categoriaRepository";
import { Categoria } from "../entity/categoriaEntity";

export class CategoriaController {
    private categoriaRepository: CategoriaRepository = new CategoriaRepository();

    public getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const categoria: Categoria = await this.categoriaRepository.findById(Number(id));
            if (!categoria) {
                return res.status(404).json({ error: 'La categoría no existe en el sistema' });
            }
            return res.status(200).json({ categoria });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const categorias: Categoria[] = await this.categoriaRepository.findAll();
            return res.status(200).json({ categorias });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    public save = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            // Verifica si la categoría ya existe en la base de datos
            const existingCategoria = await this.categoriaRepository.findByNombre(body.nombre);
            if (existingCategoria) {
                return res.status(400).json({ message: 'La categoría ya existe en la base de datos' });
            }
            
            // Guarda la nueva categoría en la base de datos
            const result: Categoria = await this.categoriaRepository.save(body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    
    public update = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            const id = body.id;
            // Verifica si la categoría existe
            const existingCategoria = await this.categoriaRepository.findById(id);
            if (!existingCategoria) {
                return res.status(404).json({ message: 'La categoría no existe en la base de datos' });
            }
            
            // Actualiza la categoría existente
            existingCategoria.nombre = body.nombre; // Actualiza el nombre de la categoría
            const result: Categoria = await this.categoriaRepository.save(existingCategoria);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    public delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            // Verifica si la categoría existe
            const existingCategoria = await this.categoriaRepository.findById(Number(id));
            if (!existingCategoria) {
                return res.status(404).json({ message: 'La categoría no existe en la base de datos' });
            }
            
            // Elimina la categoría de la base de datos
            await this.categoriaRepository.delete(Number(id));
            return res.status(200).json({ message: 'Se ha eliminado la categoría exitosamente' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
