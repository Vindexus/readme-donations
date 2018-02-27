const Repo = require('../models/repo')

function fetchConfig (repo) {
  return new Promise((resolve, reject) => {

  })
}

function findByName (owner, repo) {
  return Repo.find({
    where: {
      owner: owner.toLowerCase(),
      name: repo.toLowerCase()
    }
  })
}

function findOrFetchByName (owner, repo) {

}

module.exports = {
  findByName,
  fetchConfig
}