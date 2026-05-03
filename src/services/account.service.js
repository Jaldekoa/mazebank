/**
 * @file account.service.js
 * @description Capa de servicios para la gestión de cuentas bancarias.
 * Maneja la lógica de creación, consulta, actualización y eliminación de cuentas.
 */

import { AccountModel } from "../models/index.js";

/**
 * @typedef {Object} AccountData
 * @property {string} accountName - Alias o nombre personalizado para la cuenta.
 * @property {string} [accountNumber] - Número de cuenta generado automáticamente (solo lectura).
 * @property {number} [balance] - Saldo de la cuenta (solo lectura mediante transacciones).
 */

/**
 * Obtiene todas las cuentas asociadas a un usuario específico.
 *
 * @async
 * @function getAllUserAccounts
 * @param {number} userId - ID del usuario propietario.
 * @returns {Promise<AccountModel[]>} Listado de instancias de cuentas del usuario.
 */
async function getAllUserAccounts(userId) {
  return await AccountModel.findAll({ where: { userId } });
}

/**
 * Crea una nueva cuenta bancaria para un usuario.
 *
 * @async
 * @function createNewAccount
 * @param {number} userId - ID del usuario que crea la cuenta.
 * @param {Object} accountData - Datos iniciales de la cuenta.
 * @param {string} accountData.accountName - Alias que el usuario desea asignar.
 * @returns {Promise<AccountModel>} Instancia de la cuenta recién creada.
 */
async function createNewAccount(userId, accountData) {
  const { accountName } = accountData;
  return await AccountModel.create({ accountName, userId });
}

/**
 * Busca y devuelve la información de una cuenta específica tras verificar la propiedad.
 *
 * @async
 * @function getAccountInfo
 * @param {number} userId - ID del usuario que solicita la información.
 * @param {string} accountNumber - Número único de la cuenta.
 * @throws {Error} "Account not found or access denied" si la cuenta no existe o no pertenece al usuario.
 * @returns {Promise<AccountModel>} Instancia de la cuenta solicitada.
 */
async function getAccountInfo(userId, accountNumber) {
  const account = await AccountModel.findOne({
    where: { accountNumber, userId },
  });
  if (!account) throw new Error("Account not found or access denied");
  return account;
}

/**
 * Actualiza la información editable de una cuenta (como el nombre).
 *
 * @async
 * @function changeAccountInfo
 * @param {number} userId - ID del usuario propietario.
 * @param {string} accountNumber - Número de cuenta a modificar.
 * @param {Object} updateData - Nuevos datos para la cuenta.
 * @param {string} [updateData.accountName] - Nuevo alias para la cuenta.
 * @throws {Error} Lanza un error si la cuenta no pertenece al usuario.
 * @returns {Promise<AccountModel>} Instancia de la cuenta con los cambios aplicados.
 */
async function changeAccountInfo(userId, accountNumber, updateData) {
  const account = await AccountModel.findOne({
    where: { accountNumber, userId },
  });
  if (!account) throw new Error("Account not found or access denied");

  const { accountName } = updateData;
  if (accountName) account.accountName = accountName;

  // El guardado disparará los hooks de validación, pero no el de balance si no ha cambiado
  await account.save();
  return await AccountModel.findOne({ where: { accountNumber, userId } });
}

/**
 * Elimina una cuenta bancaria del sistema.
 *
 * @async
 * @function deleteAccount
 * @param {number} userId - ID del usuario propietario.
 * @param {string} accountNumber - Número de cuenta a eliminar.
 * @throws {Error} Lanza un error si la cuenta no pertenece al usuario o no existe.
 * @returns {Promise<void>}
 */
async function deleteAccount(userId, accountNumber) {
  const account = await AccountModel.findOne({
    where: { accountNumber, userId },
  });
  if (!account) throw new Error("Account not found or access denied");
  await account.destroy();
}

export const accountService = {
  getAllUserAccounts,
  createNewAccount,
  getAccountInfo,
  changeAccountInfo,
  deleteAccount,
};
export default accountService;
