const Sequelize  = require('sequelize')
const sequelize  = require('../lib/sequelize')
const Repo       = require('./Repo')
const currencies = require('../lib/currencies')
const badge      = require('../lib/badge')

const Donation = sequelize.define('donation', {
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

   references: {
     model: Repo,
     key: 'id',
     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
   }
 }
}, {
  hooks: {
    beforeCreate: function (donation, options) {
      console.log('donation.from',donation.from);
      donation.from = donation.from.trim()
    }
  }
})

Donation.prototype.getFrom = function () {
  return ' ' + (this.dataValues.from || 'Anonymous') + ' '
}

Donation.prototype.getAmount = function () {
  const curr = currencies[this.dataValues.enteredCurrency]
  return (curr.prefix || "") + this.dataValues.enteredAmount + ' ' + curr.ticker
}

Donation.prototype.badge = function () {
  return badge({
    text: [ this.getFrom() , this.getAmount()]
  })
}

module.exports = Donation
