/**
 * @file user.controller.js
 * @description Controlador de Express para la gestión de usuarios.
 * Maneja el registro, la autenticación (login) y el mantenimiento de perfiles de usuario.
 */

import userServices from "../../services/user.service.js";

/**
 * Definición de tipos para el controlador
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * Registra un nuevo usuario en el sistema.
 *
 * @async
 * @function registerUser
 * @param {Request} req - Petición con los datos del usuario en el `body`.
 * @param {Response} res - Respuesta con el usuario creado (201) o error (409/500).
 */
async function registerUser(req, res) {
  try {
    const newUser = await userServices.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    // Utiliza el statusCode personalizado del servicio (ej. 409 Conflict) o 500 por defecto
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

/**
 * Autentica a un usuario y entrega un token de acceso.
 *
 * @async
 * @function loginUser
 * @param {Request} req - Petición con `dni` y `password` en el `body`.
 * @param {Response} res - Respuesta con datos del usuario y JWT (200) o error (401).
 */
async function loginUser(req, res) {
  try {
    const { dni, password } = req.body;
    const data = await userServices.loginUser(dni, password);
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

/**
 * Obtiene la información del perfil del usuario actual.
 *
 * @async
 * @function getMyUserInfo
 * @param {Request} req - Petición con `dni` en el `body`.
 * @param {Response} res - Respuesta con los datos del usuario (200) o error (404).
 */
async function getMyUserInfo(req, res) {
  try {
    const { dni } = req.body;
    const user = await userServices.getUserByDni(dni);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

/**
 * Actualiza la información del perfil del usuario.
 *
 * @async
 * @function changeMyUserInfo
 * @param {Request} req - Petición con `dni` y campos a actualizar en el `body`.
 * @param {Response} res - Respuesta con el usuario actualizado (200) o error (400).
 */
async function changeMyUserInfo(req, res) {
  try {
    const { dni, ...updateData } = req.body;
    const updatedUser = await userServices.updateUserInfo(dni, updateData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

/**
 * Elimina la cuenta del usuario del sistema.
 *
 * @async
 * @function deleteMyUser
 * @param {Request} req - Petición con el `dni` del usuario a eliminar en el `body`.
 * @param {Response} res - Respuesta vacía (204 No Content) o error (400).
 */
async function deleteMyUser(req, res) {
  try {
    const { dni } = req.body;
    await userServices.deleteUser(dni);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const userController = {
  registerUser,
  loginUser,
  getMyUserInfo,
  changeMyUserInfo,
  deleteMyUser,
};
export default userController;
