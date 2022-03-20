const express = require('express')
const mysql = require('mysql');
const bodyParser = require('body-parser')
var cors = require('cors')


const sqlQuery = (connection, sql) => { // TODO Word in progress
  return connection.query(sql, (error, results, fields) => {
    const resultSet = {}
    if (error) {
      throw error
    }
    resultSet.affectedRows = results.affectedRows
    resultSet.changedRows = results.changedRows
    if (results.affectedRows > 0) {
      resultSet.data = results.map( row => ({...row}) )
    }
    return resultSet
  }
)}
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'convay_server',
  password : 'aTKy[Dd@o9TL.j4S',
  database : 'conway_game_of_life',
});

const app = express()
app.use(cors())
app.use(bodyParser.json());
const port = 4000

app.get('/', (req, res) => {
  res.send('API backend is listening!')
})

app.get('/users', (req, res, next) => {
  connection.query('SELECT id, name, username FROM user', (error, results, fields) => {
    if (error) {
      next(error)
      return
    }
    const users = []
    results.map(row => {
      users.push({...row})
    })
    res.json(users)
  })
})

app.post('/users', (req, res, next) => {
  const newUser = req.body
  const sqlError = {}
  const sql = `INSERT INTO user (name, username, password_md5) 
    VALUES (
      ${connection.escape(newUser.name)},
      ${connection.escape(newUser.username)},
      unhex(sha2(${connection.escape(newUser.password)},512))
    )`
  connection.query(sql, (error, results, fields) => {
      if (error) {
        sqlError.code =  error.code
        sqlError.errno =  error.errno
        sqlError.sqlMessage =  error.sqlMessage
        logError(req, {sqlError: sqlError});
        res.status(400)
        res.json(sqlError)
        if (sqlError.code === "ER_DUP_ENTRY") {
          next(error)
          return
        } else {
          throw error
        }
      }
      res.json({})
    }
  );
})

app.put('/users', (req, res, next) => {
  const newUser = req.body
  const sqlError = {}
  const sql = `UPDATE user 
    SET 
      name = ${connection.escape(newUser.name)},
      username = ${connection.escape(newUser.username)},
      password_md5 = unhex(sha2(${connection.escape(newUser.password)},512))
    WHERE id = ${connection.escape(newUser.id)}`
  connection.query(sql, (error, results, fields) => {
      if (error) {
        sqlError.code =  error.code
        sqlError.errno =  error.errno
        sqlError.sqlMessage =  error.sqlMessage
        logError(req, {sqlError: sqlError});
        res.status(400)
        res.json(sqlError)
        if (sqlError.code === "ER_DUP_ENTRY") {
          next(error)
          return
        } else {
          throw error
        }
      }
      res.json({})
    }
  );
})

app.use((err, req, res, next) => {
  logError(req)
  //res.status(500).send("Oops, something went wrong.")
})

app.listen(port, (() => {
  connection.connect()
  console.log(`API backend listening on port ${port}`)
}))

function logError(req, extraData) {
  console.log({
    timestamp: new Date(),
    method: req.method,
    location: req.originalUrl,
    ...extraData,
  });
}
