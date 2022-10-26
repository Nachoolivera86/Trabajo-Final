const my = require("mysql2");
const httpStatus = require('http-status')



/* ---- LLamada al back de los servicios----- */

const getPyme = (pool, req, callback) => {

  let query = "SELECT * FROM pyme";

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




const getPymeById = (pool, id, callback) => {
  let query = `SELECT * FROM pyme WHERE id = ${id}`;

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

const insertPyme = (pool, body, callback) => {
  let query = `INSERT into pyme VALUES (${body.id},"${body.razonSocial}","${body.cliente_id}")`
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

const updatePyme = (pool,id,body,callback) => {
  let query = `UPDATE pyme SET razonSocial="${body.razonSocial}", cliente_id="${body.cliente_id}" WHERE id = ${id}`
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

const deletePymeById = (pool, id, callback) => {
  let query = `Delete FROM pyme WHERE id = ${id}`;

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
  getPyme,
  getPymeById,
  insertPyme,
  updatePyme,
  deletePymeById
}
