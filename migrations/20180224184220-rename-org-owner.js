'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('repos', 'org', 'owner')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('repos', 'owner', 'org')
  }
};
