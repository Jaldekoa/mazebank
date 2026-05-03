/**
 * @file api.routes.js
 * @description Enrutador intermedio de la API.
 * Se encarga de distribuir las peticiones a los módulos específicos del sistema:
 * usuarios, cuentas bancarias y transacciones.
 */

import { Router } from "express";
import userRouter from "./user.routes.js";
import accountRouter from "./account.routes.js";
import transactionRouter from "./transaction.routes.js";

/**
 * Instancia de Router para organizar los módulos de la API.
 * @type {Router}
 */
const apiRouter = Router();

/**
 * @swagger
 * components:
 *   responses:
 *     UnauthorizedError:
 *       description: El token es inválido o no ha sido proporcionado.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "No token provided or invalid format"
 */

/**
 * Rutas relacionadas con la gestión de usuarios (Registro, Login, Perfil).
 * Prefijo: `/api/user`
 */
apiRouter.use("/user", userRouter);

/**
 * Rutas relacionadas con la gestión de cuentas bancarias (Creación, Balance, Info).
 * Prefijo: `/api/account`
 */
apiRouter.use("/account", accountRouter);

/**
 * Rutas relacionadas con operaciones monetarias (Depósitos, Retiros, Transferencias).
 * Prefijo: `/api/transaction`
 */
apiRouter.use("/transaction", transactionRouter);

export default apiRouter;
