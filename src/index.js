import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/error", (req, res) => {
  res.status(400).json({ status: "error" });
});

app.listen(PORT, () => {
  console.log(`Servidor conectado correctamente por el puerto ${PORT}`);
});
