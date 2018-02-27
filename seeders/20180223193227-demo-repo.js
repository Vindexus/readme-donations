'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('repos', [{
      owner: 'vindexus',
      name: 'nano-shopify'
    }], {});

    return queryInterface.bulkInsert('donations', [{
      from: 'Mr Dexus',
      currency: 'nano',
      amount: 0.005
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
