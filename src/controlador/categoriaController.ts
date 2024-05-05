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
                return res.status(404).json({ error: 'This category does not exist' });
            }
            res.status(200).json({ categoria });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const categorias: Categoria[] = await this.categoriaRepository.findAll();
            return res.status(200).json({ categorias });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public save = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            const existingCategoria = await this.categoriaRepository.findByNombre(body.nombre);
            if (existingCategoria) {
                return res.status(400).json({ message: 'La categoría ya existe en la base de datos' });
            }
            
            const result: Categoria = await this.categoriaRepository.save(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
    
    public update = async (req: Request, res: Response) => {
        const body = req.body;
        try {
            const id = body.id;
            const existingCategoria = await this.categoriaRepository.findById(id);
            if (!existingCategoria) {
                return res.status(404).json({ message: 'La categoría no existe en la base de datos' });
            }
            
            existingCategoria.nombre = body.nombre;
            const result: Categoria = await this.categoriaRepository.save(existingCategoria);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const existingCategoria = await this.categoriaRepository.findById(Number(id));
            if (!existingCategoria) {
                return res.status(404).json({ message: 'La categoría no existe en la base de datos' });
            }
            
            await this.categoriaRepository.delete(Number(id));
            return res.status(200).json({ message: 'Se ha eliminado la categoría exitosamente' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };
    public getByName = async (req: Request, res: Response) => {
        try {
          const name = req.params.nombre; // Cambiar de req.params.name a req.params.nombre
          const category = await this.categoriaRepository.findByNombre(name);
          res.status(200).json({ category });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    };
    
}
