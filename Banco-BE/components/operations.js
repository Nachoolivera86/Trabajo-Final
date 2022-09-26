const my = require("mysql2");
const httpStatus = require('http-status')



/* ---- LLamada al back de los servicios----- */

const getIndividuo = (pool, req, callback) => {

  let query = "SELECT * FROM individuo";

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




const getIndividuoById = (pool, id, callback) => {
  let query = `SELECT * FROM individuo WHERE id = ${id}`;

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

const insertIndividuo = (pool, body, callback) => {
  let query = `INSERT into individuo VALUES (${body.id},"${body.nombre}","${body.apellido}",${body.dni},${body.clienteId})`
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

const updateIndividuo = (pool,id,body,callback) => {
  let query = `UPDATE individuo SET id=${id},nombre="${body.nombre}",apellido="${body.apellido}",dni=${body.dni},cliente_id=${body.clienteId} WHERE id = ${id}`
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

const deleteIndividuoById = (pool, id, callback) => {
  let query = `Delete FROM individuo WHERE id = ${id}`;

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
  getIndividuo,
  getIndividuoById,
  insertIndividuo,
  updateIndividuo,
  deleteIndividuoById
}
