/**
 * @file transaction.controller.js
 * @description Controlador de Express para operaciones financieras.
 * Gestiona el flujo de depósitos, retiros, transferencias y la consulta de historiales.
 */

import transactionServices from "../../services/transaction.service.js";

/**
 * Definición de tipos para el controlador
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * Procesa un depósito de dinero en una cuenta.
 *
 * @async
 * @function makeDeposit
 * @param {Request} req - Petición con `receiverAccountNumber`, `amount` y `details` en el body.
 * @param {Response} res - Respuesta JSON con la transacción creada (201 Created).
 */
async function makeDeposit(req, res) {
  try {
    const { receiverAccountNumber, amount, details } = req.body;
    const transaction = await transactionServices.createTransaction({
      receiverAccountNumber,
      amount,
      details,
      type: "DEPOSIT",
      userId: req.user.id,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

/**
 * Procesa un retiro de efectivo de una cuenta del usuario.
 *
 * @async
 * @function makeWithdraw
 * @param {Request} req - Petición con `senderAccountNumber`, `amount` y `details` en el body.
 * @param {Response} res - Respuesta JSON con la transacción creada (201 Created).
 */
async function makeWithdraw(req, res) {
  try {
    const { senderAccountNumber, amount, details } = req.body;
    const transaction = await transactionServices.createTransaction({
      senderAccountNumber,
      amount,
      details,
      type: "WITHDRAWAL",
      userId: req.user.id,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

/**
 * Ejecuta una transferencia de fondos entre dos cuentas.
 *
 * @async
 * @function makeTransfer
 * @param {Request} req - Petición con cuentas de origen/destino, monto y detalles.
 * @param {Response} res - Respuesta JSON con la transacción creada (201 Created).
 */
async function makeTransfer(req, res) {
  try {
    const { senderAccountNumber, receiverAccountNumber, amount, details } =
      req.body;
    const transaction = await transactionServices.createTransaction({
      senderAccountNumber,
      receiverAccountNumber,
      amount,
      details,
      type: "TRANSFER",
      userId: req.user.id,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

/**
 * Obtiene el historial paginado de transacciones para una cuenta específica.
 *
 * @async
 * @function getAllTransactionsForAccount
 * @param {Request} req - Petición con `accountNumber` en params y opciones de filtrado en query.
 * @param {Response} res - Respuesta JSON con datos paginados (200 OK) o error (404 Not Found).
 */
async function getAllTransactionsForAccount(req, res) {
  try {
    const { accountNumber } = req.params;
    const { limit, page, type, sort } = req.query;

    const data = await transactionServices.getAllTransactionsForAccount(
      req.user.id,
      accountNumber,
      { limit, page, type, sort },
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export default {
  getAllTransactionsForAccount,
  makeDeposit,
  makeWithdraw,
  makeTransfer,
};
