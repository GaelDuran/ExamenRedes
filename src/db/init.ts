import { Sequelize } from "sequelize-typescript";
import { Todo } from "./models/user.models";
import { envs } from "../config/envs";

export const db = new Sequelize({
    database: envs.MYSQL_DB,
    username: envs.MYSQL_USER,
    password: envs.MYSQL_PASSWORD,
    host: envs.MYSQL_HOST,
    dialect: "mysql",
    models: [Todo]
});

export const dbConnection = async () => {
    try {
        await db.authenticate();
        console.log("Database connected");
        await db.sync({ force: false });
        console.log("Models synchronized");
    } catch (error) {
        console.error(`Error connecting to database: ${error}`);
    }
};
