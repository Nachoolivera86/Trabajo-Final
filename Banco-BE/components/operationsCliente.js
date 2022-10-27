const my = require("mysql2");
const httpStatus = require('http-status')



/* ---- LLamada al back de los servicios----- */

const getClient = (pool, req, callback) => {

  let query = "SELECT * FROM cliente";

  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) throw error;

      let response = result;
      console.log(response)
      callback(response)

      connection.release();
    });
  });
};




const getClientById = (pool, id, callback) => {
  let query = `SELECT * FROM cliente WHERE id = ${id}`;

  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) throw error;

      let response = result;
      console.log(response)
      callback(response)

      connection.release();
    });
  });
};

const insertClient = (pool, body, callback) => {
  let query = `INSERT into cliente VALUES (${body.Id},"${body.Telefono}","${body.Mail}", "${body.Direccion}", "${body.Usuario_Id}")`
  console.log(query)

  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) throw error;

      let response = result;
      console.log(response)
      callback(response)

      connection.release();
    });
  });
}

const updateClient = (pool,id,body,callback) => {
  let query = `UPDATE cliente SET telefono="${body.Telefono}",mail="${body.Mail}", direccion="${body.Direccion}", usuario_id="${body.Usuario_Id}" WHERE id = ${id}`
  console.log(query)

  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) throw error;

      let response = result;
      console.log(response)
      callback(response)

      connection.release();
    });
  });
}

const deleteClientById = (pool, id, callback) => {
  let query = `Delete FROM cliente WHERE id = ${id}`;

  pool.getConnection((error, connection) => {
    if (error) throw error;

    connection.query(query, (error, result) => {
      if (error) throw error;

      let response = result;
      console.log(response)
      callback(response)

      connection.release();
    });
  });
};




module.exports = {
  getClient,
  getClientById,
  insertClient,
  updateClient,
  deleteClientById
}
