
import * as express from "express";
import { PalabraController } from "../controlador/palabraController";

const Router = express.Router();
const palabraController = new PalabraController();

//Trae todas las
Router.get(
  "/palabras",
  palabraController.getAll
);

Router.get(
    "/palabra/byTexto/:texto",
    palabraController.getByTexto
  );

  Router.get(
    "/palabra/:id",
    palabraController.getById
  );

  Router.post(
    "/guardarPalabra",
    palabraController.savePalabra
  );

  Router.put(
    "/EditarPalabra/:id",
    palabraController.update
  );

  Router.delete(
    "/EliminarPalabra/:id",
    palabraController.delete
  );
  
  export { Router as palabraRouter };