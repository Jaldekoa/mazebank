/**
 * @file user.service.js
 * @description Capa de servicios para la gestión de usuarios.
 * Contiene la lógica de negocio para autenticación, registro y administración de perfiles.
 */

import { UserModel } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * @typedef {Object} UserData
 * @property {string} dni - Documento Nacional de Identidad único.
 * @property {string} password - Contraseña en texto plano.
 * @property {string} email - Correo electrónico.
 * @property {string} firstName - Nombre del usuario.
 * @property {string} lastName - Apellido del usuario.
 */

/**
 * Registra un nuevo usuario en la base de datos.
 * Cifra la contraseña antes de guardarla y verifica duplicados por DNI.
 *
 * @async
 * @function registerUser
 * @param {UserData} userData - Objeto con la información completa del usuario.
 * @throws {Error} Lanza un error con statusCode 409 si el DNI ya está registrado.
 * @returns {Promise<UserModel>} Instancia del usuario creado.
 */
async function registerUser(userData) {
  const { dni, password } = userData;

  const existUser = await UserModel.scope("withPassword").findOne({
    where: { dni },
  });
  if (existUser) {
    const error = new Error("Invalid credentials");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await UserModel.create({ ...userData, password: hashedPassword });
}

/**
 * Autentica a un usuario mediante DNI y contraseña.
 * Genera un token JWT si las credenciales son válidas.
 *
 * @async
 * @function loginUser
 * @param {string} dni - DNI del usuario.
 * @param {string} password - Contraseña en texto plano.
 * @throws {Error} Lanza "Invalid credentials" si el usuario no existe o la contraseña falla.
 * @returns {Promise<{userSafe: Object, token: string}>} Objeto con los datos públicos del usuario y el token JWT.
 */
async function loginUser(dni, password) {
  const user = await UserModel.scope("withPassword").findOne({
    where: { dni },
  });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  const userSafe = user.toJSON();
  delete userSafe.password;

  return { userSafe, token };
}

/**
 * Busca un usuario por su número de DNI.
 *
 * @async
 * @function getUserByDni
 * @param {string} dni - DNI a buscar.
 * @returns {Promise<UserModel|null>} Instancia del usuario o null si no se encuentra.
 */
async function getUserByDni(dni) {
  const user = await UserModel.findOne({ where: { dni } });
  return user;
}

/**
 * Actualiza la información de un usuario existente.
 *
 * @async
 * @function updateUserInfo
 * @param {string} dni - DNI del usuario a actualizar.
 * @param {Partial<UserData>} updateData - Objeto con los campos a modificar.
 * @throws {Error} Lanza un error si el usuario no existe.
 * @returns {Promise<UserModel>} Instancia del usuario actualizada.
 */
async function updateUserInfo(dni, updateData) {
  const user = await getUserByDni(dni);
  if (!user) throw new Error("Invalid data");
  return await user.update(updateData);
}

/**
 * Elimina un usuario de la base de datos por su DNI.
 *
 * @async
 * @function deleteUser
 * @param {string} dni - DNI del usuario a eliminar.
 * @throws {Error} Lanza un error si el usuario no existe.
 * @returns {Promise<void>}
 */
async function deleteUser(dni) {
  const user = await getUserByDni(dni);
  if (!user) throw new Error("Invalid user");
  await user.destroy();
}

export const userServices = {
  registerUser,
  loginUser,
  getUserByDni,
  updateUserInfo,
  deleteUser,
};
export default userServices;
