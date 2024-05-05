import * as express from "express";
import { SalaJuegoController } from "../controlador/salaJuegoController";

const Router = express.Router();
const salaJuegoController = new SalaJuegoController();

Router.get("/salasJuego", salaJuegoController.getAll);
Router.get("/salaJuego/:id", salaJuegoController.getById);
Router.post("/crearSalaJuego", salaJuegoController.save);
Router.delete("/eliminarSalaJuego/:id", salaJuegoController.delete);
Router.get(
    "/salaJuego/estado/:estado",
    salaJuegoController.getByEstado
);

export { Router as salaJuegoRouter };
