const {Pool} = require('pg')

const pool = new Pool({
  user:'postgres',
  password:'123',
  host: '34.118.99.231',
  port: 5432,
  database: 'postgres'
})

module.exports = pool