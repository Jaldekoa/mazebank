/**
 * @file db.js
 * @description Configuración y gestión de la conexión a la base de datos PostgreSQL mediante Sequelize.
 * Proporciona utilidades para autenticar la conexión y sincronizar los modelos con el esquema físico.
 */

import { Sequelize } from "sequelize";
import { logerror } from "../utils/utils.js";

/**
 * Variables de entorno para la configuración de la base de datos.
 * Se asume que están definidas en el archivo .env del proyecto.
 */
const {
  POSTGRES_NAME,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
} = process.env;

/**
 * Instancia principal de Sequelize.
 * Configurada para utilizar el dialecto PostgreSQL.
 * @type {Sequelize}
 */
const sequelize = new Sequelize(
  POSTGRES_NAME,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  {
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    dialect: "postgres",
    logging: false, // Opcional: desactiva el log de SQL en consola para mayor limpieza
  },
);

/**
 * Verifica la autenticación con la base de datos.
 * Intenta establecer una conexión para asegurar que las credenciales y el host sean correctos.
 * @async
 * @function checkDB
 * @returns {Promise<void>} No devuelve valor, lanza un log de error en caso de fallo.
 */
async function checkDB() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    logerror.red(
      "❌ An error has occurred while connecting to the database: ",
      error,
    );
  }
}

/**
 * Sincroniza los modelos definidos en la aplicación con la base de datos.
 * Crea las tablas si no existen o las actualiza según la configuración de los modelos.
 * @async
 * @function syncDB
 * @returns {Promise<void>} No devuelve valor, lanza un log de error en caso de fallo.
 */
async function syncDB() {
  try {
    await sequelize.sync();
  } catch (error) {
    logerror.red("❌ Synchronization failed: ", error);
  }
}

export { checkDB, syncDB };
export default sequelize;
