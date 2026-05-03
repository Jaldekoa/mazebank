/**
 * @file auth.middleware.js
 * @description Middleware de autorización encargado de validar tokens JWT.
 * Protege las rutas privadas verificando la identidad del usuario antes de permitir el acceso.
 */

import jwt from "jsonwebtoken";

/**
 * Definición de tipos para el middleware
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * Middleware para validar el token JWT enviado en las cabeceras.
 *
 * Si el token es válido, extrae la información del usuario (payload) y la inyecta en `req.user`.
 * En caso de error o ausencia de token, bloquea la petición con un código 401.
 *
 * @function authMiddleware
 * @param {Request} req - Objeto de petición Express. Se espera la cabecera `Authorization`.
 * @param {Response} res - Objeto de respuesta Express.
 * @param {NextFunction} next - Función para transferir el control al siguiente middleware/controlador.
 *
 * @returns {void} Llama a `next()` si el token es válido, de lo contrario devuelve una respuesta JSON 401.
 *
 * @example
 * // Ejemplo de cabecera esperada:
 * // Authorization: Bearer <token_jwt_aqui>
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No token provided or invalid format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    /**
     * @typedef {Object} UserPayload
     * @property {number} id - ID del usuario.
     * @property {string} email - Email del usuario.
     */

    /** @type {UserPayload} */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
