const request  = require('superagent')
const express  = require('express');
const Repo     = require('../models/Repo')
const Donation = require('../models/Donation')
const badge    = require('../lib/badge')
const repoUtil = require('../lib/repo')
const router   = express.Router();

function svg (req, res, next) {
  res.set('Content-Type', 'image/svg+xml')
  res.set('Vary', 'Accept-Encoding')
  next()
}

router.get('/', function(req, res) {
  res.send('Repos home page');
});

router.get('/:owner/:repo.json', function(req, res) {
  request
    .get('https://api.github.com/repos/' + req.params.owner + '/' + req.params.repo)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/vnd.github.v3+json')
    .end((err, resp) => {
      if (resp.status == 200) {
        const ghRepo = JSON.parse(resp.text)
        repoUtil.findByName(req.params.owner, req.params.repo).then((repo) => {
          res.set('Content-Type', 'application/json')
          res.status(200).send(JSON.stringify({
            readme: repo,
            github: ghRepo
          }))
        })
      }
      else {
        res.status(404).send({errors: 'Repo not found on GitHub'})
      }
    })
})

router.post('/:owner/:repo/donate', function(req, res) {
  repoUtil.findByName(req.params.owner, req.params.repo)
    .then((repo) => {
      if (!repo) {
        return res.status(400).send('Repo not found')
      }

      return brainblocks.get(req.body.token).then((data) => {
        return repo.donate({
          enteredAmount: data.amount,
          enteredCurrency: data.currency,
          receivedCurrency: 'nano',
          receivedAmount: data.amount_rai,
          receivingAddress: data.destination,
          from: req.body.from
        })
      })
    })
    .then((donation) => {
      res.status(200).send({donation: donation})
    })
    .catch((err) => {
      res.send({error: err}).status(500)
    })
});

router.get('/:owner/:repo/donations/preview', svg, function(req, res) {
  const preview = Donation.build(req.query)
  badge({
    text: [preview.getFrom(), '   $0.10 USD || 0.0087425 BTC  ']
  }).then(svg => {
    res.send(svg)
  })
})

router.get('/:owner/:repo/donations/latest/:num?', svg, function(req, res) {
  repoUtil.findByName(req.params.owner, req.params.repo).then((repo) => {
    repo.latestDonation(req.params.num).then((donation) => {
      donation.badge().then(svg => {
        res.send(svg)
      });
    }).catch((err) => {
      res.status(500).send(err.toString())
    })
  })
});

router.get('/:owner/:repo/donations/top/:num?', svg, function(req, res) {
  repoUtil.findByName(req.params.owner, req.params.repo).then((repo) => {
    repo.topDonation(req.params.num).then((donation) => {
      donation.badge().then(svg => {
        res.send(svg)
      });
    }).catch((err) => {
      res.status(500).send(err.toString())
    })
  })
});

router.get('/:id', function(req, res) {
  Repo.findById(req.params.id).then((repo) => {
    res.send(repo.owner + '/' + repo.name)
  })
});


module.exports = router;
