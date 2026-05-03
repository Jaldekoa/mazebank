/**
 * @file user.routes.js
 * @description Definición de rutas para la gestión de usuarios.
 * Incluye los endpoints para autenticación y gestión de perfil.
 */

import userController from "../../controllers/api/user.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { Router } from "express";

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Autenticación y gestión de perfil de usuario
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea un nuevo perfil de usuario en el sistema.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - dni
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jon Aldekoa"
 *               dni:
 *                 type: string
 *                 example: "12345678Z"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jon@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "secret123"
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito.
 *       400:
 *         description: El email o DNI ya están en uso.
 */
userRouter.post("/register", userController.registerUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica al usuario y devuelve un token JWT.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "jon@example.com"
 *               password:
 *                 type: string
 *                 example: "secret123"
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve token.
 *       401:
 *         description: Credenciales inválidas.
 */
userRouter.post("/login", userController.loginUser);

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Obtener perfil del usuario actual
 *     description: Devuelve los datos del usuario asociado al token enviado.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del perfil obtenidos.
 *       401:
 *         description: Token inválido o no proporcionado.
 */
userRouter.get("/me", authMiddleware, userController.getMyUserInfo);

/**
 * @swagger
 * /api/user/me:
 *   patch:
 *     summary: Actualizar perfil
 *     description: Permite modificar el nombre o email del usuario autenticado.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nuevo Nombre"
 *               email:
 *                 type: string
 *                 example: "nuevo@correo.com"
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente.
 */
userRouter.patch("/me", authMiddleware, userController.changeMyUserInfo);

/**
 * @swagger
 * /api/user/me:
 *   delete:
 *     summary: Eliminar cuenta de usuario
 *     description: Borra permanentemente el usuario del sistema.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Usuario eliminado.
 *       401:
 *         description: No autorizado.
 */
userRouter.delete("/me", authMiddleware, userController.deleteMyUser);

export default userRouter;
