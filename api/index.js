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
//console.log(connection)


const app = express()
app.use(cors())
app.use(bodyParser.json());
const port = 4000

app.get('/', (request, response) => {
  response.send({message: 'API backend is listening!'})
})


//#region /users
  app.get('/users', (request, response, next) => {
    connection.query('SELECT id, name, username FROM user', (error, results, fields) => {
      if (error) {
        next(error)
        return
      }
      const records = results.map(row => ({...row}) )
      response.json(records)
    })
  })
  app.post('/users', (request, response, next) => {
    const newUser = request.body
    const sqlErrorData = {}
    const sql = `INSERT INTO user (name, username, password_md5) 
      VALUES (
        ${connection.escape(newUser.name)},
        ${connection.escape(newUser.username)},
        unhex(sha2(${connection.escape(newUser.password)},512))
      )`
    connection.query(sql, (error, results, fields) => {
        if (error) {
          sqlErrorData.code =  error.code
          sqlErrorData.errno =  error.errno
          sqlErrorData.sqlMessage =  error.sqlMessage
          sqlErrorData.message =  error.sqlMessage // XXX
          logError(request, {sqlErrorData: sqlErrorData});
          response.status(400)
          response.json(sqlErrorData)
          if (sqlErrorData.code === "ER_DUP_ENTRY") {
            next(error)
            return
          } else {
            throw error
          }
        }
        response.json({})
      }
    );
  })
  app.post('/users/login', async (request, response, next) => {
    const credentials = request.body
    const sql = `SELECT id, name, username FROM user
      WHERE
        username = ${connection.escape(credentials.username)} AND
        password_md5 = unhex(sha2(${connection.escape(credentials.password)}, 512))`
    /*
    results = await sqlQuery(connection, sql).on("results", results => {
      console.log(results)
      return results
    })
    //console.log(results)
    //console.log(results.data)
    response.json(results.data)
    */
    connection.query(sql, (error, results, fields) => {
      if (error) {
        const sqlErrorData = handleSqlError();
        logError(request, { sqlErrorData: sqlErrorData });
        response.status(400)
        response.json(sqlErrorData)
        return
      }
      const records = results.map( row => ({...row}) )
      if (records.length === 0) {
        response.status(400)
      }
      response.json(records)
    })
  })
  app.put('/users', (request, respoense, next) => {
    const newUser = request.body
    const sqlErrorData = {}
    const sql = `UPDATE user 
      SET 
        name = ${connection.escape(newUser.name)},
        username = ${connection.escape(newUser.username)},
        password_md5 = unhex(sha2(${connection.escape(newUser.password)},512))
      WHERE id = ${connection.escape(newUser.id)}`
    connection.query(sql, (error, results, fields) => {
        if (error) {
          sqlErrorData.code =  error.code
          sqlErrorData.errno =  error.errno
          sqlErrorData.sqlMessage =  error.sqlMessage
          sqlErrorData.message =  error.sqlMessage // XXX
          respoense.status(400)
          respoense.json(sqlErrorData)
          if (sqlErrorData.code === "ER_DUP_ENTRY") {
            next(error)
            return
          } else {
            throw error
          } 
        } else if (results.affectedRows === 0) {
          respoense.status(400)
          respoense.json({message: "No such record."})
          next(new Error("No such record."))
          return
        }
        respoense.json({})
      }
    );
  })
  app.delete('/users', (request, respoense, next) => {
    const id = request.body.id
    const sqlErrorData = {}
    const sql = `DELETE FROM user WHERE id = ${connection.escape(id)}`
    connection.query(sql, (error, results, fields) => {
        if (error) {
          sqlErrorData.code =  error.code
          sqlErrorData.errno =  error.errno
          sqlErrorData.sqlMessage =  error.sqlMessage
          sqlErrorData.message =  error.sqlMessage // XXX
          respoense.status(400)
          respoense.json(sqlErrorData)
          if (sqlErrorData.code === "ER_DUP_ENTRY") {
            next(error)
            return
          } else {
            throw error
          } 
        } else if (results.affectedRows === 0) {
          respoense.status(400)
          respoense.json({message: "No such record."})
          next(new Error("No such record."))
          return
        }
        respoense.json({})
      }
    );
  })
//#endregion


app.use((error, request, response, next) => {
  logError(request)
  //res.status(500).send("Oops, something went wrong.")
})

app.listen(port, (() => {
  connection.connect()
}))

function logError(req, extraData) {
  console.log({
    timestamp: new Date(),
    method: req.method,
    location: req.originalUrl,
    ...extraData,
  });
}

function handleSqlError(error) {
  const sqlErrorData = {};
  sqlErrorData.code = error.code;
  sqlErrorData.errno = error.errno;
  sqlErrorData.sqlMessage = error.sqlMessage;
  sqlErrorData.message = error.sqlMessage; // XXX
  next(error);
  return sqlErrorData;
}

