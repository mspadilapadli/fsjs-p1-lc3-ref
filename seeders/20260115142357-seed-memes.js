"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const data = require("../data/meme.json").map((e) => {
            e.createdAt = e.updatedAt = new Date();
            return e;
        });
        await queryInterface.bulkInsert("Memes", data, {});

        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Memes", null, {});
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
    },
};
