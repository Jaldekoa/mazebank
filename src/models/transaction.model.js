/**
 * @file transaction.model.js
 * @description Definición del modelo de Transacción (Transactions).
 * Registra todos los movimientos financieros, incluyendo depósitos, retiros y transferencias.
 */

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

/**
 * Alias para el modelo base de Sequelize
 * @typedef {import('sequelize').Model} Model
 */

/**
 * Atributos del modelo de Transacción.
 *
 * Este modelo actúa como un libro de contabilidad (ledger).
 * Las referencias a `Accounts` permiten reconstruir el historial de cualquier cuenta.
 *
 * @typedef {Object} TransactionAttributes
 * @property {number} id - Identificador único de la transacción.
 * @property {number|null} senderAccountId - ID de la cuenta que envía los fondos (null en DEPOSIT).
 * @property {number|null} receiverAccountId - ID de la cuenta que recibe los fondos (null en WITHDRAWAL).
 * @property {number} amount - Cuantía de la operación (máximo 10 dígitos, 2 decimales).
 * @property {string} [details] - Concepto o nota adicional de la transacción.
 * @property {'DEPOSIT'|'WITHDRAWAL'|'TRANSFER'} type - Categoría de la operación financiera.
 * @property {Date} createdAt - Fecha y hora en que se realizó la operación.
 */

/**
 * El modelo de transacciones.
 * @type {Model & TransactionAttributes}
 */
const TransactionsModel = sequelize.define(
  "Transactions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    /**
     * ID de la cuenta de origen.
     * Vinculado a la tabla 'Accounts'. Es null para ingresos externos (DEPOSIT).
     */
    senderAccountId: {
      type: DataTypes.INTEGER,
      references: { model: "Accounts", key: "id" },
      allowNull: true,
    },
    /**
     * ID de la cuenta de destino.
     * Vinculado a la tabla 'Accounts'. Es null para retiros de efectivo (WITHDRAWAL).
     */
    receiverAccountId: {
      type: DataTypes.INTEGER,
      references: { model: "Accounts", key: "id" },
      allowNull: true,
    },
    /**
     * Monto de la transacción.
     * Se usa DECIMAL para evitar errores de precisión de punto flotante en cálculos financieros.
     */
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    /**
     * Tipo de transacción.
     * Restringido mediante ENUM a valores específicos del dominio bancario.
     */
    type: {
      type: DataTypes.ENUM("DEPOSIT", "WITHDRAWAL", "TRANSFER"),
      allowNull: false,
    },
  },
  {
    tableName: "Transactions",
    timestamps: true,
  },
);

export default TransactionsModel;
