const die       = require('die')
const sequelize = require('./lib/sequelize')
const request   = require('superagent')
const Repo      = require('../models/Repo')
const repoUtil  = require('../lib/repo')

let args = {
  org: 'Vindexus',
  repo: 'nano-shopify'
}

