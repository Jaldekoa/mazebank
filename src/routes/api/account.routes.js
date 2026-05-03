/**
 * @file account.routes.js
 * @description Definición de rutas para la gestión de cuentas bancarias.
 */

import accountController from "../../controllers/api/account.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { Router } from "express";

const accountRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Gestión de cuentas bancarias y activos financieros
 */

accountRouter.use(authMiddleware);

/**
 * @swagger
 * /api/account:
 *   get:
 *     summary: Obtener todas las cuentas del usuario
 *     description: Retorna una lista de todas las cuentas asociadas al usuario autenticado mediante el token JWT.
 *     tags: [Accounts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cuentas obtenida con éxito.
 *       401:
 *         description: No autorizado - Token ausente o inválido.
 */
accountRouter.get("/", accountController.getAllUserAccounts);

/**
 * @swagger
 * /api/account:
 *   post:
 *     summary: Crear una nueva cuenta
 *     description: Registra una nueva cuenta bancaria (ej. Ahorros, Corriente) para el usuario.
 *     tags: [Accounts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accountName
 *             properties:
 *               accountName:
 *                 type: string
 *                 example: "Mi Cuenta de Ahorros"
 *     responses:
 *       201:
 *         description: Cuenta creada con éxito.
 *       400:
 *         description: Datos de entrada inválidos.
 */
accountRouter.post("/", accountController.createNewAccount);

/**
 * @swagger
 * /api/account/{accountNumber}:
 *   get:
 *     summary: Obtener detalle de una cuenta
 *     tags: [Accounts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: El número de cuenta (ej. ES000001)
 *     responses:
 *       200:
 *         description: Información de la cuenta.
 *       404:
 *         description: Cuenta no encontrada.
 */
accountRouter.get("/:accountNumber", accountController.getAccountInfo);

/**
 * @swagger
 * /api/account/{accountNumber}:
 *   patch:
 *     summary: Actualizar información de la cuenta
 *     tags: [Accounts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountName:
 *                 type: string
 *                 example: "Nuevo nombre de cuenta"
 *     responses:
 *       200:
 *         description: Cuenta actualizada.
 */
accountRouter.patch("/:accountNumber", accountController.changeAccountInfo);

/**
 * @swagger
 * /api/account/{accountNumber}:
 *   delete:
 *     summary: Eliminar una cuenta
 *     description: Elimina la cuenta solo si el saldo actual es exactamente 0.
 *     tags: [Accounts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cuenta eliminada con éxito.
 *       400:
 *         description: No se puede eliminar una cuenta con saldo positivo.
 */
accountRouter.delete("/:accountNumber", accountController.deleteAccount);

export default accountRouter;
