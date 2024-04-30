
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
    "/palabra",
    palabraController.getByTexto
  );

  Router.get(
    "/palabra/:id",
    palabraController.getById
  );

  Router.post(
    "/guardarPalabra",
    palabraController.save
  );

  Router.put(
    "/EditarPalabra",
    palabraController.update
  )

  Router.delete(
    "/EliminarPalabra/:id",
    palabraController.delete
  )
  export { Router as palabraRouter };