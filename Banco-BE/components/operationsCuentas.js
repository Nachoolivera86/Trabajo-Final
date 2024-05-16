const my = require("mysql2");
const httpStatus = require('http-status')




/* ---- LLamada al back de los servicios----- */

const getCuentas = async (pool, req, callback) => {

  await pool.getConnection((error, connection) => {
    if (error) throw error;
    let query = "SELECT * FROM cuentas";

    connection.query(query, (error, result) => {
      if (error) throw error;

      let response = result;
      console.log(response)
      callback(response)

      connection.release();
    });
  });
};

const getMaxNumCta = async (pool, req, callback) => {

  await pool.getConnection((error, connection) => {
    if (error) throw error;
    let query = "SELECT MAX(nrocta) as maximoNumeroCuenta FROM cuentas";

    connection.query(query, (error, result) => {
      if (error) throw error;

      let response = result;
      console.log(response)
      callback(response)

      connection.release();
    });
  });
};

const getMaxCbu = async (pool, req, callback) => {

  await pool.getConnection((error, connection) => {
    if (error) throw error;
    let query = "SELECT MAX(cbu) as maximoNumeroCbu FROM cuentas";

    connection.query(query, (error, result) => {
      if (error) throw error;

      let response = result;
      console.log(response)
      callback(response)

      connection.release();
    });
  });
};

const getMaxIdCli = async (pool, req, callback) => {

  await pool.getConnection((error, connection) => {
    if (error) throw error;
    let query = "SELECT MAX(clienteid) as maximoNumeroCliente FROM cuentas";

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

const getCuentaByCbu = (pool, cbu, callback) => {

  let query = `SELECT id FROM cuentas WHERE cbu = ${cbu}`;
 
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
  let query = `INSERT into cuentas VALUES (${body.id},"${body.nrocta}","${body.cbu}",${body.saldo},${body.clienteid})`
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
  console.log("llegue al BE")
  console.log(body);
  let query = `UPDATE cuentas SET saldo=${body.deposito} WHERE id = ${id}`
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
  getMaxNumCta,
  getMaxCbu,
  getMaxIdCli,
  getCuentaById,
  getCuentaByCbu,
  insertCuenta,
  updateCuenta,
  deleteCuentaById
}
