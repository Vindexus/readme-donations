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

Repo.prototype.donate = function (amount, currency, frm, done) {
  return Donation.create({
    repoId: this.dataValues.id,
    amount: amount,
    currency: currency,
    from: frm
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
    order: [['amount', 'DESC']],
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
