import express, { Request, Response } from 'express';
import { dbConnection } from './db/init';
import { Todo } from './db/models/user.models';
import { comparePassword, hashPassword } from './utils/utils';

const app = express();
app.use(express.json());

dbConnection();

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  res.json({ message: "Body leído" });
});

app.post("/login", async (req: Request, res: Response) => {
  // Lógica para el manejo de login
});

app.listen(3000, () => {
  console.log("Aplicación corriendo en el puerto 3000");
});