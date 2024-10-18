import express, { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import { Todo } from './db/models/user.models';

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const app = express();
app.use(express.json());

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

app.get("/todos", async (req: Request, res: Response) => {
  try {
    const todos = await
    Todo.findAll();
    res.json( todos );
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
  
});

app.post("/todos", async (req: Request, res: Response) => {
  const { id, Tarea, Descripcion, Completado } = req.body;
  try {
    const newTodo = await 
    Todo.create({
      id,
      Tarea,
      Descripcion,
      Completado,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear tarea" });
  }
});

app.listen(3306, () => {
  console.log("Aplicación corriendo en el puerto 3000");
});