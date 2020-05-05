const Pool = require('pg').Pool

const pool = new Pool({
  user: '46d1a69b-6cd1-4b94-b009-537e2d575bba',
  host: '42.159.86.191',
  database: 'ecd73592-abcd-4a8e-a7c9-26e1d5bab72c',
  
  port: 5432,
})

/*
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
*/

const generalQuery = (request, response) => {
  const sql = request.body.data.sql;
  pool.query(sql, (error, results) => {
    if (error) {
      //throw error
      console.log(error)
      response.status(400).json([])
    }
    else
      response.status(200).json(results.rows)
  })
}

module.exports = {
  generalQuery,
}
