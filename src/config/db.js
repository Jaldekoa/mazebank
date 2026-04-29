import { Sequelize } from "sequelize";
import { logerror } from "../utils/utils.js";

const {
  POSTGRES_NAME,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
} = process.env;

const sequelize = new Sequelize(
  POSTGRES_NAME,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  {
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    dialect: "postgres",
  },
);

async function checkDB() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    logerror.red(
      "❌ An error has occurred while connecting to the database: ",
      error,
    );
  }
}

async function syncDB() {
  try {
    await sequelize.sync();
  } catch (error) {
    logerror.red("❌ Synchronization failed: ", error);
  }
}

export { checkDB, syncDB };
export default sequelize;
