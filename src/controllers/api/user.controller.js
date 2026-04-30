import userServices from "../../services/user.service.js";

const registerUser = async (req, res) => {
  try {
    const { dni, password, firstName, lastName, email, phoneNumber } = req.body;
    const newUser = await userServices.registerUser(dni, password, firstName, lastName, email, phoneNumber);
    res.status(201).json();

  } catch (error) {
    res.status(500).json();
  }
};

export const userController = { registerUser };
export default userController;
