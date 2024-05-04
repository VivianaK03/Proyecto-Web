import * as express from "express";
import { PalabrasPorCategoriaController } from '../controlador/palabrasPorCategoriaController';

const router = express.Router();
const palabrasPorCategoriaController = new PalabrasPorCategoriaController();

// Rutas de PalabrasPorCategoria
router.post('/asociarPalabraACategoria', palabrasPorCategoriaController.asociarPalabrasACategoria);
router.delete('/desvincularPalabraDeCategoria', palabrasPorCategoriaController.desvincularPalabraDeCategoria);

export { router as palabrasPorCategoriaRoutes };
