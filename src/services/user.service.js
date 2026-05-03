import { UserModel } from "../models/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

async function registerUser(userData) {
    const { dni, password } = userData;
    
    const existUser = await UserModel.scope("withPassword").findOne({ where: { dni } });
    if (existUser) {
        const error = new Error("Invalid credentials");
        error.statusCode = 409;
        throw error;
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    return await UserModel.create({ ...userData, password: hashedPassword });
};

async function loginUser(dni, password) {
    const user = await UserModel.scope("withPassword").findOne({ where: { dni } });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' }
    );

    const userSafe = user.toJSON();
    delete userSafe.password;

    return { userSafe, token };
};

async function getUserByDni(dni) {
    const user = await UserModel.findOne({ where: { dni } });
    return user;
};

async function updateUserInfo(dni, updateData) {
    const user = await getUserByDni(dni);
    if (!user) throw new Error("Invalid data");
    return await user.update(updateData);
};

async function deleteUser(dni) {
    const user = await getUserByDni(dni);
    if (!user) throw new Error("Invalid user");
    await user.destroy();
};

export const userServices = { registerUser, loginUser, getUserByDni, updateUserInfo, deleteUser };
export default userServices;