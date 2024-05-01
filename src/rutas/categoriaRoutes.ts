import * as express from "express";
import { CategoriaController } from "../controlador/categoriaController";

const Router = express.Router();
const categoriaController = new CategoriaController();

Router.get(
  "/categorias",
  categoriaController.getAll
);

Router.get(
    "/categoria/:id",
    categoriaController.getById
);

Router.post(
    "/guardarCategoria",
    categoriaController.save
);

Router.put(
    "/editarCategoria",
    categoriaController.update
);

Router.delete(
    "/eliminarCategoria/:id",
    categoriaController.delete
);

export { Router as categoriaRouter };
