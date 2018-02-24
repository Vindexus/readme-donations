const express       = require('express')
const bodyParser    = require('body-parser')
const die           = require('die')

const config        = require('./config/config.json')
const sequelize     = require('./lib/sequelize')

const repoRoutes = require('./routes/repo')

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const app = express()
const port = config.port || 4700

app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/repos', repoRoutes);

app.get('/', (req, res) => {
  res.send('Running.')
})

app.listen(port, () => {
  console.log('App running on port ' + port + '!')
})
