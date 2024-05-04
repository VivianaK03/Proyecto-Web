import { Request, Response } from 'express';
import { PalabrasPorCategoriaRepository } from '../repositorio/palabrasPorCategoriaRepository';

export class PalabrasPorCategoriaController {
    private palabrasPorCategoriaRepository: PalabrasPorCategoriaRepository = new PalabrasPorCategoriaRepository();

    public asociarPalabrasACategoria = async (req: Request, res: Response) => {
        const { cate_id } = req.body;
        const { pala_id } = req.body; 

        try {
            await this.palabrasPorCategoriaRepository.asociarPalabraACategoria(parseInt(cate_id), parseInt(pala_id));

            return res.status(200).json({ message: 'Las palabras se han asociado a la categoría correctamente' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    public  desvincularPalabraDeCategoria = async (req: Request, res: Response) => {
        const { cate_id, pala_id } = req.body;

        try {
            await this.palabrasPorCategoriaRepository.desvincularPalabraDeCategoria(parseInt(cate_id), parseInt(pala_id));

            return res.status(200).json({ message: 'La palabra se ha desvinculado de la categoría correctamente' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
