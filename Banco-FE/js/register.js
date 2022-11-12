
let user = "";
let password = "";
let checkPass = "";
let saldo = 0;
let datosCuentas1 = 0;
let datosCuentas2 = 0;
let datosCuentas3 = 0;
let datosClientes = 0;
let ultimoIdUsuario = 0;


const datosCuenta = fetch('http://localhost:8080/api/v1/cuentas').then(res=>res.json());
const datosUsuario = fetch('http://localhost:8080/api/v1/usuario').then(res=>res.json());
const maxIdCuenta = fetch('http://localhost:8080/api/v1/maxIdCu').then(res=>res.json());
const maxIdCbu = fetch('http://localhost:8080/api/v1/maxCbu').then(res=>res.json());
const maxIdCLiente = fetch('http://localhost:8080/api/v1/maxCli').then(res=>res.json());



function registrar(e){
    e.preventDefault();

    user = document.getElementById("register-user").value;
    password = document.getElementById("register-password").value;
    checkPass = document.getElementById("register-passwordd").value;
/*
    telefono = document.getElementById("register-telefono").value;
    mail = document.getElementById("register-mail").value;
    direccion = document.getElementById("register-direccion").value;
*/ 
    console.log(user);
    console.log(password);
    console.log(checkPass);
      
    try {
        if (!user || !password || !checkPass){
            console.log("Uno de los campos esta vacio")
            return
        } 
    
        if(password === checkPass){
            Promise.all([datosUsuario])
            .then(resultArray => { 
                registrarUsuario(resultArray[0],user,password)})
            .then( Promise.all([datosCuenta,maxIdCuenta,maxIdCbu,maxIdCLiente])
            .then(resultArray => { 
                registrarCuenta(resultArray[0],resultArray[1],resultArray[2],resultArray[3])})
            )
            .catch(e => console.log('Error: ' + e));
           
            
        }else{
            console.log("datos invalidos");
        }

    }catch (error){
        console.log(error)
    }
    
}


const datosCli = async () => {
    try {
        let cliente = await fetch('http://localhost:8080/api/v1/cliente').then(res => res.json())
        datosClientes = cliente;
        console.log(datosClientes)
    }catch (error) {
        console.log(error)
    }
}


const registrarUsuario = async (datosUsuarios,user,password) => {

    let ultimoIdUsuario = (datosUsuarios.length) + 1;
    console.log(ultimoIdUsuario);
    let data2 = {
        "id" : ultimoIdUsuario,
        "user": user,
        "password": password
    }

    try {
        console.log(data2);
        let response3 = await fetch('http://localhost:8080/api/v1/usuario/insert', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data2)
        });
        if (await response3.json()) {
            console.log("Salio todo bien en registrar usuario");
         }
         else {
             console.log("todo mal")
         }
    } catch (error) {
        console.log("salio por el catch");
    }
}

/*
const registrarCli = async () => {
    let ultimoIdCli = (datosClientes.length) + 1;
    console.log(ultimoIdCli);
    let data1 = {
        "id" : ultimoIdCli,
        "telefono" : telefono,
        "mail" : mail,
        "direccion" : direccion,
        "usuarioid" : ultimoIdUsuario
    } 
    try {
        let response = await fetch('http://localhost:8080/api/v1/cliente/insert', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data1)
        });
        if (await response.json()) {
            console.log("Salio todo bien cliente");
         }
         else {
             console.log("todo mal")
         }
    } catch (error) {
        console.log("salio por el catch");
    }
}
*/


const promiseTimeOut = () => {
    setTimeout(() => {
        registrarCuenta()
    },4000);
}

const registrarCuenta = async (datosCuentas,datosCuentas1,datosCuentas2,datosCuentas3) => {
    console.log(datosCuentas);
    console.log(datosCuentas1);
    console.log(datosCuentas2);
    console.log(datosCuentas3);
    let nuevoIdCuenta = (datosCuentas.length) + 1;
    let nuevoNroCta = (datosCuentas3[0].maximoNumeroCuenta) + 1;
    let nuevoCbu = (datosCuentas2[0].maximoNumeroCbu) +1;
    let clienteId = (datosCuentas1[0].maximoNumeroCliente) + 1;
    let data3 = {
        "id" : nuevoIdCuenta,
        "nrocta": nuevoNroCta,
        "cbu": nuevoCbu,
        "saldo": saldo,
        "clienteid": clienteId
    }
    try {
        let response4 = await fetch('http://localhost:8080/api/v1/cuenta/insert', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data3)
        });
        if (await response4.json()) {
            console.log("Salio todo bien en generar cuentas");
         }
         else {
             console.log("todo mal")
         }
    } catch (error) {
        console.log("salio por el catch");
    }
}

//datosCli();
//registrarCli();

//datosCuenta();
//datosUsuario();
//maxIdCuenta();
//maxIdCbu();
//maxIdCLiente();
let btnRegistrar = document.getElementById("btnContinue");
btnRegistrar.addEventListener("click",registrar);
