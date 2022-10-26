const my = require("mysql2");
const httpStatus = require('http-status')



/* ---- LLamada al back de los servicios----- */

const getAdmin = (pool, req, callback) => {

  let query = "SELECT * FROM administrador";

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




const getAdminById = (pool, id, callback) => {
  let query = `SELECT * FROM administrador WHERE id = ${id}`;

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

const insertAdmin = (pool, body, callback) => {
  let query = `INSERT into administrador VALUES (${body.id},"${body.nombre}","${body.apellido}", "${body.dni}", "${body.usuario_id}")`
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

const updateAdmin = (pool,id,body,callback) => {
  let query = `UPDATE administrador SET telefono="${body.nombre}",mail="${body.apellido}", direccion="${body.dni}", usuario_id="${body.usuario_id}" WHERE id = ${id}`
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

const deleteAdminById = (pool, id, callback) => {
  let query = `Delete FROM administrador WHERE id = ${id}`;

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
  getAdmin,
  getAdminById,
  insertAdmin,
  updateAdmin,
  deleteAdminById
}
