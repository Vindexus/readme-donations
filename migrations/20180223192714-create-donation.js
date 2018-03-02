'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('donations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      from: Sequelize.STRING,
      enteredAmount: Sequelize.DOUBLE,
      enteredCurrency: Sequelize.STRING,
      receivedAmount: Sequelize.DOUBLE,
      receivedCurrency: {
        type: Sequelize.ENUM,
        values: ['nano']
      },
      receivingAddress: Sequelize.STRING,
      usdValue: Sequelize.DOUBLE,
      repoId: {
        type: Sequelize.INTEGER,
        references: { model: 'repos', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    }, {
      timestamps: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('donations');
  }
};