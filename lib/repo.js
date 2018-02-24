const Repo = require('../models/repo')

function fetchConfig (repo) {
  return new Promise((resolve, reject) => {

  })
}

findByName = function (org, repo) {
  return Repo.find({
    where: {
      org: org,
      name: repo
    }
  })
}

module.exports = {
  findByName,
  fetchConfig
}