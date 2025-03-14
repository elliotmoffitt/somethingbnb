"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://www.stockvault.net/data/2023/04/20/298977/preview16.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://www.stockvault.net/data/2012/12/24/139306/preview16.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://www.stockvault.net/data/2018/12/10/257212/preview16.jpg",
          preview: true,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
