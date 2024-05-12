let params = new URLSearchParams(location.search);
let id = params.get('Id');
let usuario = params.get('User');
let validacion = false;
let contador = 0;

let ResponseId = 0;





const consultaSaldo = async () => {
	try{
		let response = await fetch('http://localhost:8080/api/v1/cuenta/'+id).then(res => res.json())
		console.log(response)
        if(contador == 0) {
            mostrarSaldo(response);
            contador = 1;
        } else {
            ocultarSaldo();
            contador = 0;
        }
        

	}catch (error){
		console.log(error)
	}
}

const ocultarSaldo = () => {
    let html = "";

    document.querySelector("#consultaSaldo").innerHTML = html;

}


let consulta = document.getElementById("consultar");
consulta.addEventListener("click",consultaSaldo,true);

const consultaCbu = async () => {
	try{
		let response = await fetch('http://localhost:8080/api/v1/cuenta/'+id).then(res => res.json())
		if(contador == 0) {
            mostrarCbu(response);
            contador = 1;
        } else {
            ocultarCbu();
            contador = 0;
        }


	}catch (error){
		console.log(error)
	}
}

const ocultarCbu = () => {
    let html = "";

    document.querySelector("#consultaCbu").innerHTML = html;
}


let consulta1 = document.getElementById("consultarCbu");
consulta1.addEventListener("click",consultaCbu,true);




function  mostrarSaldo(paramResponseOrigen) {
    console.log(paramResponseOrigen)
    console.log(paramResponseOrigen[0].saldo)
   
    let html = "";
         html += `El saldo de su cuenta es: ${paramResponseOrigen[0].saldo}  pesos
        
           `;

    document.querySelector("#consultaSaldo").innerHTML = html;
}

function  mostrarCbu(paramResponseOrigen) {
    console.log(paramResponseOrigen)
    console.log(paramResponseOrigen[0].cbu)
  
        let html = "";
         html += `El cbu correspondiente a su cuenta es: ${paramResponseOrigen[0].cbu} 
        
           `;

    document.querySelector("#consultaCbu").innerHTML = html;
}

const depositarImp = () => {
    document.getElementById("depositarImporte").classList.add("aux");
    document.getElementById("btnDep").classList.add("aux"); 
}
let consulta2 = document.getElementById("depositar");
consulta2.addEventListener("click",depositarImp,true);



const mostrarMensaje = () => {
    document.getElementById("mensajeExito").style.visibility = "visible" 
}

const mensajeError = () => {
    document.getElementById("mensajeError").style.visibility = "visible" 
}



const depositarImporte = async (deposito) => {
   let paramResponseOrigen = 0
    try{
		let response = await fetch('http://localhost:8080/api/v1/cuenta/'+id).then(res => res.json())
		paramResponseOrigen = Number(response[0].saldo); 
        console.log(paramResponseOrigen)
	}catch (error){
		console.log(error)
	}

    deposito = paramResponseOrigen + deposito;
    console.log(deposito);
    let data = {
        "id" : id,
        "deposito": deposito
    }
    try {
        let response2 = await fetch('http://localhost:8080/api/v1/cuenta/update/'+ id , {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (await response2.json()) {
            console.log("Salio todo bien");
            mostrarMensaje();
            consultaSaldo();
            console.log('Su nuevo saldo es de: ', deposito)
         }
         else {
             console.log("todo mal")
         }
    } catch (error) {
        mensajeError();
    }
}

function funcionAuxiliar(){
    let valorAdepositar = Number(document.getElementById("deposito").value); 
    depositarImporte(valorAdepositar);
    
}

let btnDep = document.getElementById("btnDep");
btnDep.addEventListener("click",funcionAuxiliar);


const extraerImp = () => {
    document.getElementById("extraerImporte").classList.add("aux1");
    document.getElementById("btnExt").classList.add("aux1");
}
let consulta3 = document.getElementById("extraer");
consulta3.addEventListener("click",extraerImp);

const fondosInsuficientes = () => {
    document.getElementById("mensajeFondosInsuficientes").style.visibility = "visible" 
}

const extraccionCorrecta = () => {
    document.getElementById("mensajeExtraccionCorrecta").style.visibility = "visible"
}



let extraerSaldo = async (valorExtraer) => {
    let paramResponseOrigen = 0
    try{
		let response = await fetch('http://localhost:8080/api/v1/cuenta/'+id).then(res => res.json())
		paramResponseOrigen = Number(response[0].saldo); 
        console.log(paramResponseOrigen)
	}catch (error){
		console.log(error)
	}

    if (valorExtraer > paramResponseOrigen) {
        fondosInsuficientes();
    } else {
        let deposito = paramResponseOrigen - valorExtraer;
        let data = {
            "id" : id,
            "deposito": deposito
        }
        try {
            let response2 = await fetch('http://localhost:8080/api/v1/cuenta/update/'+ id , {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (await response2.json()) {
                console.log("Salio todo bien");
                extraccionCorrecta();
                consultaSaldo();
             }
             else {
                 console.log("todo mal")
             }
        } catch (error) {
            console.log("salio por el catch");
        }
    }
    
}

function funcionAuxiliar1(){
    let valorExtrae = Number(document.getElementById("extraccion").value); 
    extraerSaldo(valorExtrae)
}

let btnExt = document.getElementById("btnExt");
btnExt.addEventListener("click",funcionAuxiliar1);


const transferirImp = () => {
    document.getElementById("transferirImporte").classList.add("aux2");
    document.getElementById("btnTra").classList.add("aux2");
}
let consulta4 = document.getElementById("transferir");
consulta4.addEventListener("click",transferirImp);

let auxiliar = 0;

let transferencia = async (idEmpleado,importeAtransferir) => {
    let paramResponseOrigen = 0
    let paramResponse2Destino = 0
    try{
        ResponseId =await fetch('http://localhost:8080/api/v1/cuentaCbu/'+idEmpleado).then(res => res.json())
        console.log(ResponseId);


        //consultar a la API si el cbu ingresado es valido
        //si es valido devuelve el id del usuario, si es invalido sale por el catch
        //si es valido capturo el id en una variable y esa variable la usamos la linea 246 
    } catch (error){
		console.log(error)
    }
    try{
        console.log(ResponseId);
        auxiliar = ResponseId[0].id;
        console.log("El Id perteneciente al CBU es:" + auxiliar);
        auxiliar = parseInt(auxiliar);
		let response = await fetch('http://localhost:8080/api/v1/cuenta/'+ auxiliar).then(res => res.json())
		paramResponseOrigen = Number(response[0].saldo); 
        console.log(paramResponseOrigen)
	}catch (error){
		console.log(error)
	}
    if (importeAtransferir > paramResponseOrigen) {
        fondosInsuficientes();
    } else {
        try{
            let response2 = await fetch('http://localhost:8080/api/v1/cuenta/'+idEmpleado).then(res => res.json())
            console.log(response2)
            paramResponse2Destino = Number(response2[0].saldo); 
        }catch (error){
            console.log(error)
        }
        paramResponse2Destino = paramResponse2Destino + importeAtransferir;
        let deposito = paramResponseOrigen - importeAtransferir;
        let data = {
            "id" : id,
            "deposito": deposito,
        }
        try {
            let response2 = await fetch('http://localhost:8080/api/v1/cuenta/update/'+ id , {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (await response2.json()) {
                console.log("Salio todo bien");
                mostrarMensaje();
                consultaSaldo();
            }
             else {
                 console.log("todo mal")
             }
        } catch (error) {
            console.log("salio por el catch");
        }
        let data2 = {
            "id": idEmpleado,
            "deposito": paramResponse2Destino
        }
        try {
            let response3 = await fetch('http://localhost:8080/api/v1/cuenta/update/'+ idEmpleado , {
                method: 'PATCH',
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
            console.log("salio or el catch");
        }
    }
    
}


function funcionAuxiliar2(){
    let idTra = Number(document.getElementById("idTrans").value); 
    let valorTra = Number(document.getElementById("transferencia").value); 
    transferencia(idTra,valorTra)
}

let btnTra = document.getElementById("btnTra");
btnTra.addEventListener("click",funcionAuxiliar2);


const traerUsuario = async () => {
    try{
		let response = await fetch('http://localhost:8080/api/v1/usuario/'+id).then(res => res.json())
		let nombre = response[0].user; 
        let campoUsuario = document.getElementById("nombreUsuario").innerHTML = nombre
      
	}catch (error){
		console.log(error)
	}

}

const salir = () => {

    if (validacion === false) {
        window.location.replace("http://localhost:5500/Trabajo-Final/Banco-FE/index.html"); 
    }
}    

let btnSalir = document.getElementById('btnSalir');
btnSalir.addEventListener('click',salir);

traerUsuario();