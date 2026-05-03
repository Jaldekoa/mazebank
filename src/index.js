/**
 * @file index.js
 * @description Punto de entrada principal del servidor API de Maze Bank.
 * Configura el middleware global, la conexión a la base de datos y el enrutamiento.
 * @author Jon Aldekoa
 * @see {@link http://localhost:3000/api-docs} // Si llegas a usar Swagger más adelante
 */

import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import { checkDB, syncDB } from "./config/db.js";
import { rateLimit } from "express-rate-limit";
import router from "./routes/routes.js";
import { log } from "./utils/utils.js";
import express from "express";
import cors from "cors";

/**
 * Puerto en el que escuchará el servidor
 * @type {number|string}
 */
const PORT = process.env.PORT || 3000;

/**
 * Configuración de CORS (Cross-Origin Resource Sharing).
 * Define los dominios permitidos y métodos HTTP aceptados.
 * @type {Object}
 */
const corsOptions = {
  origin: ["https://mazebank.com", `http://localhost:${PORT}`],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

/**
 * Configuración del limitador de peticiones (Rate Limiting).
 * Previene ataques de fuerza bruta y abuso de la API.
 */
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 100, // Máximo 100 peticiones por ventana
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

// --- Middleware Global ---

app.use(limiter);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Enrutamiento ---

/**
 * Enrutador principal de la aplicación.
 * @see ./routes/routes.js
 */
app.use("/", router);

// La interfaz estará disponible en http://localhost:3000/api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Endpoint de verificación de salud (Health Check).
 * @name get/health
 * @function
 * @param {Object} req - Objeto de petición Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {JSON} Estado actual del servidor.
 */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/**
 * Endpoint de prueba de errores.
 * @name get/error
 * @function
 * @param {Object} req - Objeto de petición Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
app.get("/error", (req, res) => {
  res.status(400).json({ status: "error" });
});

// --- Inicialización de Base de Datos y Servidor ---

/** Verifica la conexión con la base de datos configurada */
checkDB();

/** Sincroniza los modelos con las tablas de la base de datos */
syncDB();

/**
 * Inicia el servidor Express.
 */
app.listen(PORT, () => {
  log.green(`✔ Server successfully connected via port ${PORT}`);
});
