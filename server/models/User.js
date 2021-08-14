const { db } = require("./index.js");

module.exports = (db, types) => {
    return db.define("user", {
        id: {
            type: types.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: types.STRING,
            allowNull: false
        },
        surname: {
            type: types.STRING,
            allowNull: false
        },
        email: {
            type: types.STRING,
            allowNull: false
        },
        password: {
            type: types.STRING,
            allowNull: false
        }
    }
)};