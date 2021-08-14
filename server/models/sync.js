const { db } = require("./index");
const chalk = require("chalk");

db.sync({force: true})
    .then(() => console.log(chalk.green("DB are synced successfully!!!")));