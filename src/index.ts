import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";

import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
import { palabraRouter } from "./rutas/palabraRoutes";
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerSpec from './swagger'
import { categoriaRouter } from "./rutas/categoriaRoutes"; // Importa las rutas de categorías
import { salaJuegoRouter } from "./rutas/salaJuegoRoutes"; // Importa las rutas de categorías
import {palabrasPorCategoriaRoutes} from "./rutas/palabrasPorCategoriaRoutes";

const cors = require('cors');
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(errorHandler);
const { PORT = 3000 } = process.env;
const wsInstance = require('express-ws')(app);
const websocketRouter = require('../src/rutas/socketRoutes')(wsInstance);

app.use("/api", palabraRouter);
app.use("/api", categoriaRouter);
app.use("/api", salaJuegoRouter);
app.use("/api", palabrasPorCategoriaRoutes);
app.use('/ws', websocketRouter);
console.log(swaggerSpec);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/palabras", palabraRouter); // Rutas de palabras
app.use("/api/categorias", categoriaRouter); // Rutas de categorías
app.use("/api/salaJuego", salaJuegoRouter); 
app.use("/api/vinculacion", palabrasPorCategoriaRoutes); 


AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Aplicación corriendo exitosamente en http://localhost:" + PORT);
    });
    console.log("¡Se ha inicializado!");
  })
  .catch((error) => console.log(error));