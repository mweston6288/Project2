//Dependecies
const bcrypt = require("bcryptjs");
//Routes
module.exports = function(sequelize, DataTypes) {
    //Defining User Model
    const User = sequelize.define("Users",{
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [8, 128]
            }
        }
    },{
        timestamps: false
    });
    User.associate = function(models){
        //Associating User with games and Developers
        User.belongsToMany(models.Games, {through: "User_Wishlist"});
        User.belongsToMany(models.Games, {through: "User_Library"});
        User.belongsToMany(models.Developer, {through: "User_Watchlist"});
    };

    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.addHook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    User.addHook("beforeBulkUpdate", function (user) {
        if (user.attributes.password) {
            user.attributes.password = bcrypt.hashSync(user.attributes.password, bcrypt.genSaltSync(10), null);
        }
    });

    return User;
};