"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const user_models_1 = require("./db/models/user.models");
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
sequelize.authenticate()
    .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
})
    .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
});
app.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield user_models_1.Todo.findAll();
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener tareas" });
    }
}));
app.post("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, Tarea, Descripcion, Completado } = req.body;
    try {
        const newTodo = yield user_models_1.Todo.create({
            id,
            Tarea,
            Descripcion,
            Completado,
        });
        res.status(201).json(newTodo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear tarea" });
    }
}));
app.listen(3306, () => {
    console.log("Aplicación corriendo en el puerto 3000");
});
