import { checkDB, syncDB } from "./config/db.js";
import router from "./routes/routes.js";
import { log } from "./utils/utils.js";
import express from "express";
import cors from "cors";

const corsOptions = {
  origin: ["https://mazebank.com", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
