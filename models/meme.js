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
        get caption() {
            return `${this.title} by ${this.author}`;
        }

        showStatus() {
            let status = "";
            if (!this.votes) {
                status = `Standard`;
            } else {
                if (this.isFunny === false) {
                    status = `Good`;
                } else {
                    status = `Funny`;
                }
            }
            return status;
        }
    }
    Meme.init(
        {
            author: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `Author is required `,
                    },
                    notNull: {
                        msg: `Author cannot be null `,
                    },
                },
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `Title is required `,
                    },
                    notNull: {
                        msg: `Title cannot be null `,
                    },
                },
            },
            imageURL: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: `Image is required `,
                    },
                    notNull: {
                        msg: `Image cannot be null `,
                    },
                },
            },
            votes: DataTypes.INTEGER,
            isFunny: DataTypes.BOOLEAN,
            CategoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: {
                        msg: `CategoryId must be a number`,
                    },
                    notEmpty: {
                        msg: `Category is required `,
                    },
                    notNull: {
                        msg: `CategoryId cannot be null `,
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Meme",
            hooks: {
                beforeCreate(value, potion) {
                    value.votes = 0;
                    value.isFunny = false;
                },
            },
        },
    );
    return Meme;
};
