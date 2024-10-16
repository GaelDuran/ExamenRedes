const express = require('express');
const { dbConnection } = require('./db/init');
const { User } = require('./db/models/user.model');
const { comparePassword, hashPassword } = require('./utils/utils');
const app = express();
app.use(express.json());
dbConnection();
app.get("/", async (req, res) => {
    res.json({ message: "Respondiendo al GET" });
});
app.post("/", async (req, res) => {
    const body = req.body;
    console.log(body);
    res.json({ message: "Body leído" });
});
app.post("/login", async (req, res) => {
});
app.listen(3000, () => {
    console.log("Aplicación corriendo en el puerto 3000");
});
