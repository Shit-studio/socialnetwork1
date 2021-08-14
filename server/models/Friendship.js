const { db } = require("./index.js");

module.exports = (db, types) => {
    return db.define("friendship", {
        id: {
            type: types.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: types.ENUM(["Pending", "Accepted"]),
            allowNull: false
        }
    });
};