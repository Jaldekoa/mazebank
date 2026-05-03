import sequelize from "../config/db.js";
import { AccountModel } from "../models/index.js";
import { log } from "../utils/utils.js";
import { Op } from "sequelize";

async function getAllUserAccounts() {};
async function createNewAccount() {};
async function getAccountInfo() {};
async function changeAccountInfo() {};
async function deleteAccount() {};

export const accountServices = {getAllUserAccounts, createNewAccount, getAccountInfo, changeAccountInfo, deleteAccount };
export default accountServices;
