/**
 * @file transaction.routes.js
 * @description Definición de rutas para operaciones transaccionales.
 * Gestiona el historial de movimientos, depósitos, retiros y transferencias entre cuentas.
 */

import { Router } from "express";
import transactionController from "../../controllers/api/transaction.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const transactionRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Operaciones financieras y consulta de movimientos
 */

transactionRouter.use(authMiddleware);

/**
 * @swagger
 * /api/transaction/{accountNumber}:
 *   get:
 *     summary: Historial de transacciones de una cuenta
 *     description: Obtiene todos los movimientos (depósitos, retiros y transferencias) asociados a una cuenta con soporte para filtros.
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de cuenta a consultar (ej. ES000001).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de registros por página.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página.
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [DEPOSIT, WITHDRAWAL, TRANSFER]
 *         description: Filtrar por tipo de operación.
 *     responses:
 *       200:
 *         description: Historial de transacciones obtenido.
 *       404:
 *         description: Cuenta no encontrada.
 */
transactionRouter.get(
  "/:accountNumber",
  transactionController.getAllTransactionsForAccount,
);

/**
 * @swagger
 * /api/transaction/deposit:
 *   post:
 *     summary: Realizar un depósito
 *     description: Incrementa el saldo de una cuenta específica.
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accountNumber
 *               - amount
 *             properties:
 *               accountNumber:
 *                 type: string
 *                 example: "ES000001"
 *               amount:
 *                 type: number
 *                 example: 100.50
 *               details:
 *                 type: string
 *                 example: "Ingreso de efectivo"
 *     responses:
 *       201:
 *         description: Depósito realizado con éxito.
 */
transactionRouter.post("/deposit", transactionController.makeDeposit);

/**
 * @swagger
 * /api/transaction/withdraw:
 *   post:
 *     summary: Realizar un retiro
 *     description: Extrae fondos de una cuenta del usuario.
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accountNumber
 *               - amount
 *             properties:
 *               accountNumber:
 *                 type: string
 *                 example: "ES000001"
 *               amount:
 *                 type: number
 *                 example: 50.00
 *     responses:
 *       201:
 *         description: Retiro realizado con éxito.
 *       400:
 *         description: Saldo insuficiente.
 */
transactionRouter.post("/withdraw", transactionController.makeWithdraw);

/**
 * @swagger
 * /api/transaction/transfer:
 *   post:
 *     summary: Realizar una transferencia
 *     description: Envía fondos desde una cuenta de origen a una cuenta de destino.
 *     tags: [Transactions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senderAccountNumber
 *               - receiverAccountNumber
 *               - amount
 *             properties:
 *               senderAccountNumber:
 *                 type: string
 *                 example: "ES000001"
 *               receiverAccountNumber:
 *                 type: string
 *                 example: "ES000002"
 *               amount:
 *                 type: number
 *                 example: 250.00
 *               details:
 *                 type: string
 *                 example: "Pago de alquiler"
 *     responses:
 *       201:
 *         description: Transferencia ejecutada correctamente.
 *       400:
 *         description: Error en la transferencia (saldo insuficiente o cuentas inválidas).
 */
transactionRouter.post("/transfer", transactionController.makeTransfer);

export default transactionRouter;
