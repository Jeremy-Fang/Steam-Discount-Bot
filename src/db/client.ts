import { Sequelize } from "sequelize";

export const client = new Sequelize({
    dialect: "sqlite",
    storage: `${__dirname}.sqlite`
});