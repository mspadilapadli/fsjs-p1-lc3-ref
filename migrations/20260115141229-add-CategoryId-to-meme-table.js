"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("Memes", "CategoryId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Categories",
                key: "id",
            },
        });
        /**
         * Add altering commands here.
         *
         * Example:
         *
         */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("Memes", "CategoryId");
        /**
         * Add reverting commands here.
         *
         * Example:
         *
         */
    },
};
