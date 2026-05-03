import { checkDB, syncDB } from "./config/db.js";
import { rateLimit } from "express-rate-limit";
import router from "./routes/routes.js";
import { log } from "./utils/utils.js";
import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ["https://mazebank.com", `http://localhost:${PORT}`],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const limiter = rateLimit({ windowMs: 5 * 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false });

const app = express();

app.use(limiter);
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
