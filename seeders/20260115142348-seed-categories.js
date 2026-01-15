"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const data = require("../data/category.json").map((e) => {
            e.createdAt = e.updatedAt = new Date();
            return e;
        });
        await queryInterface.bulkInsert("Categories", data, {});

        /**
         * Add seed commands here.
         *
         * Example:
         */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Categories", null, {});

        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
