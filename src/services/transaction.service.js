/**
 * @file transaction.service.js
 * @description Capa de servicios para la gestión de transacciones monetarias.
 * Implementa lógica de depósitos, retiros y transferencias bajo un entorno transaccional
 * para garantizar la integridad de los saldos bancarios.
 */

import sequelize from "../config/db.js";
import { AccountModel, TransactionsModel } from "../models/index.js";
import { Op } from "sequelize";

/**
 * @typedef {Object} TransactionParams
 * @property {string} [senderAccountNumber] - Cuenta de origen (requerida para TRANSFER y WITHDRAWAL).
 * @property {string} [receiverAccountNumber] - Cuenta de destino (requerida para TRANSFER y DEPOSIT).
 * @property {number|string} amount - Monto de la operación.
 * @property {string} [details] - Concepto o descripción de la transacción.
 * @property {'DEPOSIT'|'WITHDRAWAL'|'TRANSFER'} type - Tipo de movimiento financiero.
 * @property {number} userId - ID del usuario que intenta realizar la operación.
 */

/**
 * Ejecuta una transacción financiera de forma atómica.
 *
 * El proceso incluye:
 * 1. Inicio de transacción gestionada por Sequelize.
 * 2. Bloqueo de filas (SELECT FOR UPDATE) para evitar problemas de concurrencia.
 * 3. Validación de saldo suficiente y propiedad de cuenta.
 * 4. Actualización atómica de saldos mediante `.increment()`.
 * 5. Registro del movimiento en el historial.
 *
 * @async
 * @function createTransaction
 * @param {TransactionParams} params - Datos de la transacción.
 * @throws {Error} Lanza un error si hay fondos insuficientes, cuentas no encontradas o errores de BD.
 * @returns {Promise<TransactionsModel>} La instancia de la transacción creada.
 */
async function createTransaction({
  senderAccountNumber,
  receiverAccountNumber,
  amount,
  details,
  type,
  userId,
}) {
  const t = await sequelize.transaction();

  try {
    let [senderAccount, receiverAccount] = [null, null];
    const amountNum = Number(amount);

    if (amountNum <= 0) throw new Error("Amount must be greater than 0");

    // --- LÓGICA DE SALIDA DE DINERO ---
    if (type === "WITHDRAWAL" || type === "TRANSFER") {
      senderAccount = await AccountModel.findOne({
        where: { accountNumber: senderAccountNumber, userId },
        transaction: t,
        lock: true,
      });

      if (!senderAccount)
        throw new Error("Sender account not found or access denied");
      if (Number(senderAccount.balance) < amountNum)
        throw new Error("Insufficient funds");

      await senderAccount.increment("balance", {
        by: -amountNum,
        transaction: t,
      });
      await senderAccount.reload({ transaction: t });
    }

    // --- LÓGICA DE ENTRADA DE DINERO ---
    if (type === "DEPOSIT" || type === "TRANSFER") {
      receiverAccount = await AccountModel.findOne({
        where: { accountNumber: receiverAccountNumber },
        transaction: t,
        lock: true,
      });

      if (!receiverAccount) throw new Error("Receiver account not found");

      await receiverAccount.increment("balance", {
        by: amountNum,
        transaction: t,
      });
      await receiverAccount.reload({ transaction: t });
    }

    // --- REGISTRO DEL MOVIMIENTO ---
    const newTransaction = await TransactionsModel.create(
      {
        senderAccountId: senderAccount?.id || null,
        receiverAccountId: receiverAccount?.id || null,
        amount: amountNum,
        details,
        type,
      },
      { transaction: t },
    );

    await t.commit();
    return newTransaction;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

/**
 * Obtiene el historial de movimientos de una cuenta con paginación y filtros.
 *
 * @async
 * @function getAllTransactionsForAccount
 * @param {number} userId - ID del usuario solicitante (para validación de propiedad).
 * @param {string} accountNumber - Número de cuenta a consultar.
 * @param {Object} [options={}] - Opciones de filtrado y paginación.
 * @param {number} [options.limit=10] - Registros por página.
 * @param {number} [options.page=1] - Número de página actual.
 * @param {'DEPOSIT'|'WITHDRAWAL'|'TRANSFER'} [options.type] - Filtrar por tipo específico.
 * @param {'ASC'|'DESC'} [options.sort='DESC'] - Orden cronológico.
 *
 * @throws {Error} "Account not found" si el usuario no es dueño de la cuenta.
 * @returns {Promise<{totalItems: number, totalPages: number, currentPage: number, transactions: TransactionsModel[]}>}
 */
async function getAllTransactionsForAccount(
  userId,
  accountNumber,
  options = {},
) {
  const { limit = 10, page = 1, type, sort = "DESC" } = options;

  const account = await AccountModel.findOne({
    where: { accountNumber, userId },
  });
  if (!account) throw new Error("Account not found");

  const offset = (page - 1) * limit;
  const whereConditions = {
    [Op.or]: [
      { senderAccountId: account.id },
      { receiverAccountId: account.id },
    ],
  };

  if (type) whereConditions.type = type;

  const { count, rows } = await TransactionsModel.findAndCountAll({
    where: whereConditions,
    limit: Number(limit),
    offset: Number(offset),
    order: [["createdAt", sort]],
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: Number(page),
    transactions: rows,
  };
}

export default { createTransaction, getAllTransactionsForAccount };
