const Sequelize = require("sequelize");
const UserModel = require("./User.js");
const PostModel = require("./Post.js");
const FriendshipModel = require("./Friendship.js");

const db = new Sequelize("heroku_1b0e515a023e5c0", "b0006858b92fec", "5c021dd1", {
    dialect: "mysql",
    host: "eu-cdbr-west-01.cleardb.com",
    port: "3306",
    logging: console.log,
});

const User = UserModel(db, Sequelize);
const Post = PostModel(db, Sequelize);
const Friendship = FriendshipModel(db, Sequelize);

User.belongsToMany(User, {as: "Requesters", foreignKey: "addresseeId", through: Friendship});
User.belongsToMany(User, {as: "Addressees", foreignKey: "requesterId", through: Friendship});

User.hasMany(Post, {onDelete: "CASCADE"});
Post.belongsTo(User);

module.exports = { db, User, Post, Friendship };