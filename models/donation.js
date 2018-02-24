const Sequelize  = require('sequelize')
const sequelize  = require('../lib/sequelize')
const Repo       = require('./Repo')
const currencies = require('../lib/currencies')
const badge      = require('../lib/badge')

const Donation = sequelize.define('donation', {
  from: Sequelize.STRING,
  amount: Sequelize.DOUBLE(11, 12),
  currency: {
    type: Sequelize.ENUM,
    values: ['nano', 'btc']
  },
  repoId: {
   type: Sequelize.INTEGER,

   references: {
     // This is a reference to another model
     model: Repo,

     // This is the column name of the referenced model
     key: 'id',

     // This declares when to check the foreign key constraint. PostgreSQL only.
     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
   }
 }
})

Donation.prototype.getFrom = function () {
  return ' ' + (this.dataValues.from || 'Anonymous') + ' '
}

Donation.prototype.getAmount = function () {
  const curr = currencies[this.dataValues.currency]
  return (curr.prefix || "") + this.dataValues.amount + ' ' + curr.ticker
}

Donation.prototype.badge = function () {
  return badge({
    text: [ this.getFrom() , this.getAmount()]
  })
}

module.exports = Donation
