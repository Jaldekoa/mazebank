import userServices from "../../services/user.service.js";

async function registerUser(req, res) {
  try {
    const newUser = await userServices.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { dni, password } = req.body;
    const data = await userServices.loginUser(dni, password);
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

async function getMyUserInfo(req, res) {
  try {
    const { dni, ...updateData } = req.body;
    const user = await userServices.getUserByDni(dni, updateData);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function changeMyUserInfo(req, res) {
  try {
    const { dni, ...updateData } = req.body;
    const updatedUser = await userServices.updateUserInfo(dni, updateData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteMyUser(req, res) {
  try {
    const { dni } = req.body;
    await userServices.deleteUser(dni);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const userController = { registerUser, loginUser, getMyUserInfo, changeMyUserInfo, deleteMyUser };
export default userController;
