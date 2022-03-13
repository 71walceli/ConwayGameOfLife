const express = require('express')
const mysql = require('mysql');


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'convay_server',
  password : 'aTKy[Dd@o9TL.j4S',
  database : 'conway_game_of_life',
});
connection.connect()

const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('API backend is listening!')
})
app.get('/Users', (req, res) => {
  connection.query('SELECT id, name, username FROM user', (error, results, fields) => {
    if (error) 
      throw error;
    const users = []
    results.map(row => {
      users.push({...row})
    })
    res.send(users)
  });
})

app.listen(port, () => {
  console.log(`API backend listening on port ${port}`)
})