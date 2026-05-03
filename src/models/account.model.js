/**
 * @file account.model.js
 * @description Definición del modelo de Cuenta Bancaria (Accounts).
 * Incluye lógica automatizada mediante hooks para la generación de números de cuenta,
 * protección de saldos y validaciones de borrado.
 */

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

/**
 * @typedef {import('sequelize').Model} Model
 */

/**
 * Atributos del modelo de Cuenta.
 *
 * @typedef {Object} AccountAttributes
 * @property {number} id - Identificador único incremental.
 * @property {number} userId - ID del usuario propietario (FK).
 * @property {string} accountName - Alias o nombre de la cuenta (ej: "Ahorros").
 * @property {string} accountNumber - Número de cuenta único formateado (ej: ES000001).
 * @property {number} balance - Saldo actual de la cuenta.
 * @property {Date} createdAt - Fecha de creación.
 * @property {Date} updatedAt - Fecha de última modificación.
 */

/**
 * El modelo de la cuenta bancaria.
 * Para evitar errores de JSDoc con tipos genéricos complejos, usamos Object o un alias simple.
 * @type {Model & AccountAttributes}
 */
const AccountModel = sequelize.define(
  "Accounts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    /** Referencia al usuario propietario de la cuenta */
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "Users", key: "id" },
      allowNull: false,
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    /** Número de cuenta único generado automáticamente por hooks */
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    /**
     * Saldo disponible.
     * Protegido contra ediciones manuales directas mediante hooks de ciclo de vida.
     */
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "Accounts",
    timestamps: true,
    /**
     * Hooks de ciclo de vida para automatización y seguridad.
     */
    hooks: {
      /**
       * Genera un número de cuenta secuencial con prefijo 'ES' antes de la validación.
       * Asegura que el saldo inicial sea siempre 0.
       * @param {Object} account - Instancia de la cuenta.
       */
      beforeValidate: async (account) => {
        const lastAccount = await AccountModel.findOne({
          order: [["id", "DESC"]],
          attributes: ["accountNumber"],
          raw: true,
        });

        let nextNumber = 1;
        if (lastAccount && lastAccount.accountNumber) {
          const lastNumberStr = lastAccount.accountNumber.replace("ES", "");
          nextNumber = parseInt(lastNumberStr, 10) + 1;
        }

        account.accountNumber = `ES${nextNumber.toString().padStart(6, "0")}`;
        account.balance = 0;
      },

      /**
       * Bloquea cambios directos en el saldo y en el número de cuenta.
       * El saldo solo puede alterarse a través de incrementos/decrementos transaccionales.
       * @param {Object} account - Instancia de la cuenta a actualizar.
       * @throws {Error} Si se detecta un intento de modificar el saldo manualmente.
       */
      beforeUpdate: (account) => {
        if (account.changed("balance")) {
          const previousBalance = account._previousDataValues.balance;
          const currentBalance = account.getDataValue("balance");

          if (Number(previousBalance) !== Number(currentBalance)) {
            throw new Error(
              "The balance can only be changed through transactions.",
            );
          }
        }

        if (account.changed("accountNumber")) {
          account.accountNumber = account._previousDataValues.accountNumber;
        }
      },

      /**
       * Impide el borrado de la cuenta si todavía posee fondos.
       * @param {Object} account - Instancia de la cuenta a eliminar.
       * @throws {Error} Si el saldo es distinto de cero.
       */
      beforeDestroy: (account) => {
        if (Number(account.balance) !== 0) {
          throw new Error("Cannot delete an account with remaining balance.");
        }
      },
    },
  },
);

export default AccountModel;
