const Repo = require('./models/Repo')
const Donation = require('./models/Donation')

Repo.sync({force: true})
Donation.sync({force: true})