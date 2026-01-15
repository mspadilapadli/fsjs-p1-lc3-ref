"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Meme extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Meme.belongsTo(models.Category);
        }
    }
    Meme.init(
        {
            author: DataTypes.STRING,
            title: DataTypes.STRING,
            imageUrl: DataTypes.STRING,
            votes: DataTypes.INTEGER,
            isFunny: DataTypes.BOOLEAN,
            CategoryId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Meme",
        }
    );
    return Meme;
};
