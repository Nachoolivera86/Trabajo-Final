
let user = "";
let password = "";
let checkPass = "";
let saldo = 0;
let datosCuentas1 = 0;
let datosCuentas2 = 0;
let datosCuentas3 = 0;
let datosUsuarios = 0;
let datosClientes = 0;
let ultimoIdUsuario = 0;



function registrar(){
    user = document.getElementById("register-user").value;
    password = document.getElementById("register-password").value;
    checkPass = document.getElementById("register-passwordd").value;

    telefono = document.getElementById("register-telefono").value;
    mail = document.getElementById("register-mail").value;
    direccion = document.getElementById("register-direccion").value;

    console.log(user);
    console.log(password);
    console.log(checkPass);
    console.log(telefono);
    console.log(mail);
    console.log(direccion);
    try {
        if (!user || !password || !checkPass || !telefono || !mail || !direccion){
            console.log("Uno de los campos esta vacio")
            return
        } 
    
        if(password === checkPass){
            registrarUsuario();
            registrarCli();
            
        }else{
            console.log("datos invalidos");
        }

    }catch (error){
        console.log(error)
    }
    
}

let btnRegistrar = document.getElementById("btnContinue");
btnRegistrar.addEventListener("click",registrar);

const datosUsuario = async () => {
	try{
		let usuarios = await fetch('http://localhost:8080/api/v1/usuario').then(res => res.json())
		datosUsuarios = usuarios;
        console.log(datosUsuarios)
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

const datosCuenta = async () => {
    try {
        let cuentas = await fetch('http://localhost:8080/api/v1/cuentas').then(res => res.json())
        datosCuentas = cuentas;
        console.log(datosCuentas)
    } catch (error) {
        console.log(error)
    }
}

const maxIdCuenta = async () => {
    try {
        let cuentas = await fetch('http://localhost:8080/api/v1/maxIdCu').then(res => res.json())
        datosCuentas1 = cuentas;
        console.log(datosCuentas1)
    } catch (error) {
        console.log(error)
    }
}

const maxIdCbu = async () => {
    try {
        let cuentas = await fetch('http://localhost:8080/api/v1/maxCbu').then(res => res.json())
        datosCuentas2 = cuentas;
        console.log(datosCuentas2)
    } catch (error) {
        console.log(error)
    }
}

const maxIdCLiente = async () => {
    try {
        let cuentas = await fetch('http://localhost:8080/api/v1/maxCli').then(res => res.json())
        datosCuentas3 = cuentas;
        console.log(datosCuentas3)
    } catch (error) {
        console.log(error)
    }
}

const registrarUsuario = async () => {
    let data2 = {
        "user": user,
        "password": password
    }
    try {
        let response3 = await fetch('http://localhost:8080/api/v1/usuario/insert', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data2)
        });
        if (await response3.json()) {
            console.log("Salio todo bien");
         }
         else {
             console.log("todo mal")
         }
    } catch (error) {
        console.log("salio por el catch");
    }
}

const registrarCli = async () => {
    let data1 = {
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
            console.log("Salio todo bien");
         }
         else {
             console.log("todo mal")
         }
    } catch (error) {
        console.log("salio por el catch");
    }
}

const registrarCuenta = async () => {
    let nuevoIdCuenta = (datosCuentas.length) + 1;
    let nuevoNroCta = (datosCuentas1[0].maximoNumeroCuenta) + 1;
    let nuevoCbu = (datosCuentas2[0].maximoNumeroCbu) +1;
    let clienteId = (datosCuentas3[0].maximoNumeroClienteId) + 1;
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
            console.log("Salio todo bien en cuentas");
         }
         else {
             console.log("todo mal")
         }
    } catch (error) {
        console.log("salio por el catch");
    }
}


datosCli();
registrarCli();
datosUsuario();
datosCuenta();
maxIdCuenta();
maxIdCbu();
maxIdCLiente();