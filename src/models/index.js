/**
 * @file index.js (Models)
 * @description Punto centralizado de modelos y definiciones de asociaciones.
 * Configura las relaciones de base de datos (1:N) entre Usuarios, Cuentas y Transacciones.
 */

import UserModel from "./user.model.js";
import AccountModel from "./account.model.js";
import TransactionsModel from "./transaction.model.js";

// --- Relaciones Usuario - Cuenta ---

/**
 * Un usuario puede tener múltiples cuentas bancarias.
 * @see UserModel
 */
UserModel.hasMany(AccountModel, { foreignKey: "userId" });

/**
 * Cada cuenta pertenece a un único usuario propietario.
 * @see AccountModel
 */
AccountModel.belongsTo(UserModel, { foreignKey: "userId" });

// --- Relaciones Cuenta - Transacciones (Como Emisor) ---

/**
 * Una cuenta puede ser el origen de muchas transacciones.
 * Alias: `SentTransactions`
 */
AccountModel.hasMany(TransactionsModel, {
  as: "SentTransactions",
  foreignKey: "senderAccountId",
});

/**
 * Una transacción puede tener una cuenta de origen asociada.
 * Alias: `Sender`
 */
TransactionsModel.belongsTo(AccountModel, {
  as: "Sender",
  foreignKey: "senderAccountId",
});

// --- Relaciones Cuenta - Transacciones (Como Receptor) ---

/**
 * Una cuenta puede recibir fondos de muchas transacciones.
 * Alias: `ReceivedTransactions`
 */
AccountModel.hasMany(TransactionsModel, {
  as: "ReceivedTransactions",
  foreignKey: "receiverAccountId",
});

/**
 * Una transacción puede tener una cuenta de destino asociada.
 * Alias: `Receiver`
 */
TransactionsModel.belongsTo(AccountModel, {
  as: "Receiver",
  foreignKey: "receiverAccountId",
});

export { UserModel, AccountModel, TransactionsModel };
