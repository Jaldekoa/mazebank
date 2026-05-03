/**
 * @file routes.js
 * @description Enrutador raíz de la aplicación.
 * Centraliza y organiza los grupos de rutas bajo el prefijo global `/api`.
 */

import { Router } from "express";
import apiRouter from "./api/api.routes.js";

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: Bearer
 *       bearerFormat: JWT
 *       description: Ingrese su token JWT para acceder a los endpoints protegidos.
 */

/**
 * Montaje de las rutas de la API.
 * Todas las rutas definidas en `apiRouter` serán accesibles bajo el prefijo `/api`.
 *
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operaciones de autenticación y perfil
 *   - name: Accounts
 *     description: Gestión de cuentas bancarias
 *   - name: Transactions
 *     description: Historial y movimientos financieros
 */
router.use("/api", apiRouter);

export default router;
