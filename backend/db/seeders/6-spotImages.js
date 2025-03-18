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
          spotId: 1,
          url: "https://www.stockvault.net//data/2013/09/30/148490/thumb16.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://www.stockvault.net//data/2013/09/30/148475/thumb16.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://www.stockvault.net/data/2012/12/24/139306/preview16.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://www.stockvault.net//data/2013/09/30/148477/thumb16.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://www.stockvault.net//data/2013/09/30/148497/thumb16.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://www.stockvault.net//data/2013/09/30/148499/thumb16.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://www.stockvault.net//data/2013/09/30/148500/thumb16.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://www.stockvault.net//data/2009/04/11/108544/thumb16.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://www.stockvault.net//data/2009/04/30/108779/thumb16.jpg",
          preview: false,
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
