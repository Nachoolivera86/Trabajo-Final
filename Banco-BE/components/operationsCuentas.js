const my = require("mysql2");
const httpStatus = require('http-status')



/* ---- LLamada al back de los servicios----- */

const getCuentas = (pool, req, callback) => {

  let query = "SELECT * FROM cuentas";

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




const getCuentaById = (pool, id, callback) => {

  let query = `SELECT * FROM cuentas WHERE id = ${id}`;
 
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

const insertCuenta = (pool, body, callback) => {
  let query = `INSERT into cuentas VALUES (${body.id},"${body.nrocta}","${body.cbu}",${body.saldo},${body.clienteId})`
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

const updateCuenta = (pool,id,body,callback) => {
  let query = `UPDATE cuentas SET nrocta="${body.nrocta}",cbu=${body.cbu},saldo=${body.saldo},cliente_id=${body.clienteId} WHERE id = ${id}`
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

const deleteCuentaById = (pool, id, callback) => {
  let query = `Delete FROM cuentas WHERE id = ${id}`;

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
  getCuentas,
  getCuentaById,
  insertCuenta,
  updateCuenta,
  deleteCuentaById
}
