const Sequelize = require('sequelize')
const sequelize = require('../lib/sequelize')
const Donation = require('./Donation')

let Repo = sequelize.define('repos', {
  owner: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  }
})

Repo.prototype.toString = function () {
  return this.owner + '/' + this.name
}

Repo.prototype.donate = function (data, done) {
  return Donation.create({
    repoId: this.dataValues.id,
    enteredAmount: data.enteredAmount,
    enteredCurrency: data.enteredCurrency,
    receivedAmount: data.receivedAmount,
    receivedCurrency: data.receivedCurrency,
    from: data.from
  })
}

Repo.prototype.latestDonation = function (num) {
  num = num || 1
  return Donation.findAll({
    where: {
      repoId: this.dataValues.id
    },
    order: [['createdAt', 'DESC']],
    limit: num,
    offset: num - 1
  }).then((donations) => {
    return new Promise(function (resolve, reject) {
      if (donations.length) {
        resolve(donations[0])
      }
      else {
        reject(new Error('No donations found.'))
      }
    })
  })
}

Repo.prototype.topDonation = function (num) {
  num = num || 1
  return Donation.findAll({
    where: {
      repoId: this.dataValues.id
    },
    //This assumes all donations are received in the same currency
    //If that ever changes this sort will be obsolete
    order: [['receivedAmount', 'DESC']],
    limit: num,
    offset: num - 1
  }).then((donations) => {
    return new Promise(function (resolve, reject) {
      if (donations.length) {
        resolve(donations[0])
      }
      else {
        reject(new Error('No donations found.'))
      }
    })
  })
}


module.exports = Repo
