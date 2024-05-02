import * as express from "express";
import { SalaJuegoController } from "../controlador/SalaJuegoController";

const Router = express.Router();
const salaJuegoController = new SalaJuegoController();

Router.get("/salasJuego", salaJuegoController.getAll);
Router.get("/salaJuego/:id", salaJuegoController.getById);
Router.post("/crearSalaJuego", salaJuegoController.save);
Router.delete("/eliminarSalaJuego/:id", salaJuegoController.delete);

export { Router as salaJuegoRouter };
