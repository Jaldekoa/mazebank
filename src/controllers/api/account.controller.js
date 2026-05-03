/**
 * @file account.controller.js
 * @description Controlador de Express para gestionar las operaciones de cuentas bancarias.
 */

import accountServices from "../../services/account.service.js";

/**
 * Definición de tipos globales para este archivo
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * Obtiene todas las cuentas del usuario autenticado.
 *
 * @async
 * @function getAllUserAccounts
 * @param {Request} req - Petición con el objeto `user` inyectado por el middleware.
 * @param {Response} res - Respuesta JSON con el listado de cuentas (200 OK).
 */
async function getAllUserAccounts(req, res) {
  try {
    const accounts = await accountServices.getAllUserAccounts(req.user.id);
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Crea una nueva cuenta para el usuario autenticado.
 *
 * @async
 * @function createNewAccount
 * @param {Request} req - Petición con el `body` que contiene el `accountName`.
 * @param {Response} res - Respuesta JSON con la cuenta creada (201 Created).
 */
async function createNewAccount(req, res) {
  try {
    const newAccount = await accountServices.createNewAccount(
      req.user.id,
      req.body,
    );
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

/**
 * Obtiene la información de una cuenta específica mediante el número de cuenta en los parámetros.
 *
 * @async
 * @function getAccountInfo
 * @param {Request} req - Petición con `params.accountNumber`.
 * @param {Response} res - Respuesta JSON con los datos de la cuenta (200 OK) o error (404 Not Found).
 */
async function getAccountInfo(req, res) {
  try {
    const account = await accountServices.getAccountInfo(
      req.user.id,
      req.params.accountNumber,
    );
    res.status(200).json(account);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

/**
 * Actualiza los metadatos de una cuenta (como el nombre/alias).
 *
 * @async
 * @function changeAccountInfo
 * @param {Request} req - Petición con `params.accountNumber` y `body` con los cambios.
 * @param {Response} res - Respuesta JSON con la cuenta actualizada (200 OK).
 */
async function changeAccountInfo(req, res) {
  try {
    const updatedAccount = await accountServices.changeAccountInfo(
      req.user.id,
      req.params.accountNumber,
      req.body,
    );
    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

/**
 * Elimina una cuenta bancaria del usuario.
 *
 * @async
 * @function deleteAccount
 * @param {Request} req - Petición con `params.accountNumber`.
 * @param {Response} res - Respuesta vacía indicando éxito (204 No Content).
 */
async function deleteAccount(req, res) {
  try {
    await accountServices.deleteAccount(req.user.id, req.params.accountNumber);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const accountController = {
  getAllUserAccounts,
  createNewAccount,
  getAccountInfo,
  changeAccountInfo,
  deleteAccount,
};
export default accountController;
