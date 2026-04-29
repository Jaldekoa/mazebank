import express from "express";
import { checkDB, syncDB } from "./config/db.js";
import { log } from "./utils/utils.js";
import router from "./routes/routes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/error", (req, res) => {
  res.status(400).json({ status: "error" });
});

checkDB();
syncDB();

app.listen(PORT, () => {
  log.green(`✔ Server successfully connected via port ${PORT}`);
});
