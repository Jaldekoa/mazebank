import { Sequelize } from "sequelize";
import { logerror } from "../utils/utils.js";

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
});

async function checkDB() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    logerror.red("❌ An error has occurred while connecting to the database: ", error);
  }
}

async function syncDB() {
  try {
    await sequelize.sync({ alter: true });
  } catch (error) {
    logerror.red("❌ Synchronization failed: ", error);
  }
}

export { checkDB, syncDB };
export default sequelize;
