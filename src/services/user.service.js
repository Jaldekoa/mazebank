import { UserModel } from "../models/index.js";
import bcrypt from "bcrypt";

async function registerUser(dni, password, firstName, lastName, email, phoneNumber) {
    const existUser = await User.findOne({ where: { dni } });
    if (existUser) { return res.status(409).json() };
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ dni, password: hashedPassword, firstName, lastName, email, phoneNumber });

    return newUser
};

export const userServices = { registerUser };
export default userServices;
