const { db } = require("./index.js");

module.exports = (db, types) => {
    return db.define("post", {
        id: {
            type: types.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        caption: {
            type: types.TEXT,
            allowNull: false
        }
    }
)};
