/**
 * @file user.model.js
 * @description Definición del modelo de Usuario (Users) utilizando Sequelize.
 * Este modelo gestiona la identidad de los clientes y sus credenciales de acceso.
 */

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

/**
 * Modelo de Usuario.
 *
 * **Seguridad:** Este modelo implementa un `defaultScope` que excluye el campo `password`
 * en todas las consultas para evitar fugas de datos accidentales.
 *
 * @typedef {Object} UserAttributes
 * @property {number} id - Identificador único incremental (PK).
 * @property {string} dni - Documento Nacional de Identidad (usado para login).
 * @property {string} password - Contraseña cifrada del usuario.
 * @property {string} firstName - Nombre del usuario.
 * @property {string} lastName - Apellidos del usuario.
 * @property {string} [email] - Correo electrónico de contacto.
 * @property {string} [phoneNumber] - Teléfono de contacto.
 * @property {Date} createdAt - Fecha de creación del registro.
 * @property {Date} updatedAt - Fecha de la última actualización.
 */

/**
 * @type {import('sequelize').ModelDefined<UserAttributes, UserAttributes>}
 */
const UserModel = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isEmail: true },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Users",
    timestamps: true,
    /**
     * Configuración de ámbitos (Scopes) para el modelo.
     */
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      /** Ámbito para incluir la contraseña en procesos de autenticación */
      withPassword: { attributes: {} },
    },
  },
);

export default UserModel;
