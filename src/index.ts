import express, { Request, Response } from 'express';
import { Sequelize } from 'sequelize';

// Crea la conexión a la base de datos usando las variables de entorno
const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const app = express();
app.use(express.json());

// Verifica la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  res.json({ message: "Body leído" });
});

app.listen(3000, () => {
  console.log("Aplicación corriendo en el puerto 3000");
});