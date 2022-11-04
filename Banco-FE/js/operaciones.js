let params = new URLSearchParams(location.search);
let id = params.get('Id');
let usuario = params.get('User');
let validacion = false;
let contador = 0;





const consultaSaldo = async () => {
	try{
		let response = await fetch('http://localhost:8080/api/v1/cuenta/'+id).then(res => res.json())
		//console.log(response)
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




function  mostrarSaldo(paramResponse) {
    console.log(paramResponse)
    console.log(paramResponse[0].saldo)
   
    let html = "";
         html += `El saldo de su cuenta es: ${paramResponse[0].saldo}  pesos
        
           `;

    document.querySelector("#consultaSaldo").innerHTML = html;
}

function  mostrarCbu(paramResponse) {
    console.log(paramResponse)
    console.log(paramResponse[0].cbu)
  
        let html = "";
         html += `El cbu correspondiente a su cuenta es: ${paramResponse[0].cbu} 
        
           `;

    document.querySelector("#consultaCbu").innerHTML = html;
}

const depositarImp = () => {
    document.getElementById("depositarImporte").classList.add("aux");
    document.getElementById("btnDep").classList.add("aux");
}
let consulta2 = document.getElementById("depositar");
consulta2.addEventListener("click",depositarImp);



const mostrarMensaje = () => {
    document.getElementById("mensajeExito").style.visibility = "visible" 
}


const depositarImporte = async (deposito) =>{
   let paramResponse = 0
    try{
		let response = await fetch('http://localhost:8080/api/v1/cuenta/'+id).then(res => res.json())
		paramResponse = Number(response[0].saldo); 
        console.log(paramResponse)
	}catch (error){
		console.log(error)
	}

    deposito = paramResponse + deposito;
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
         }
         else {
             console.log("todo mal")
         }
    } catch (error) {
        console.log("salio por el catch");
    }

}

function funcionAuxiliar(){
    let valorDeposito = Number(document.getElementById("deposito").value); 
    depositarImporte(valorDeposito);
    
}

let btnDep = document.getElementById("btnDep");
btnDep.addEventListener("click",funcionAuxiliar);


const extraerImp = () => {
    document.getElementById("extraerImporte").classList.add("aux1");
    document.getElementById("btnExt").classList.add("aux1");
}
let consulta3 = document.getElementById("extraer");
consulta3.addEventListener("click",extraerImp);



let extraerSaldo = async (valorExtraer) => {
    let paramResponse = 0
    try{
		let response = await fetch('http://localhost:8080/api/v1/cuenta/'+id).then(res => res.json())
		paramResponse = Number(response[0].saldo); 
        console.log(paramResponse)
	}catch (error){
		console.log(error)
	}

    if (valorExtraer > paramResponse) {
        alert("Saldo insuficiente");
    } else {
        alert("Extraccion correcta");
        let deposito = paramResponse - valorExtraer;
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

let transferencia = async (idEmpleado,importeAtransferir) => {
    let paramResponse = 0
    let paramResponse2 = 0
    try{
		let response = await fetch('http://localhost:8080/api/v1/cuenta/'+id).then(res => res.json())
		paramResponse = Number(response[0].saldo); 
        console.log(paramResponse)
	}catch (error){
		console.log(error)
	}
    if (importeAtransferir > paramResponse) {
        alert("Saldo insuficiente");
    } else {
        alert("Pago correcto");
        try{
            let response2 = await fetch('http://localhost:8080/api/v1/cuenta/'+idEmpleado).then(res => res.json())
            paramResponse2 = Number(response2[0].saldo); 
        }catch (error){
            console.log(error)
        }
        paramResponse2 = paramResponse2 + importeAtransferir;
        let deposito = paramResponse - importeAtransferir;
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
             }
             else {
                 console.log("todo mal")
             }
        } catch (error) {
            console.log("salio por el catch");
        }
        let data2 = {
            "id": idEmpleado,
            "deposito": paramResponse2
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


let pagarSueldo = async () => {
    let paramResponse = 0
    let paramResponse2 = 0
    try{
		let response = await fetch('http://localhost:8080/api/v1/cuenta/'+id).then(res => res.json())
		paramResponse = Number(response[0].saldo); 
        console.log(paramResponse)
	}catch (error){
		console.log(error)
	}
    let idEmpleado = Number(prompt("Ingrese el id del empleado a depositar: ")) 
    let pagoEmpleado = Number(prompt("Ingrese un importe a pagar:" ));
    if (pagoEmpleado > paramResponse) {
        alert("Saldo insuficiente");
    } else {
        alert("Pago correcto");
        try{
            let response2 = await fetch('http://localhost:8080/api/v1/cuenta/'+idEmpleado).then(res => res.json())
            paramResponse2 = Number(response2[0].saldo); 
        }catch (error){
            console.log(error)
        }
        paramResponse2 = paramResponse2 + pagoEmpleado;
        let deposito = paramResponse - pagoEmpleado;
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
             }
             else {
                 console.log("todo mal")
             }
        } catch (error) {
            console.log("salio por el catch");
        }
        let data2 = {
            "id": idEmpleado,
            "deposito": paramResponse2
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
            console.log("salio por el catch");
        }
    }
    
}


let pagoSueldos = document.getElementById("pagoSueldos");
pagoSueldos.addEventListener("click",pagarSueldo);

const traerUsuario = async () => {
    try{
		let response = await fetch('http://localhost:8080/api/v1/individuo/'+id).then(res => res.json())
		let nombre = response[0].nombre; 
        let apellido = response[0].apellido;
        let nombreCompleto = nombre + " " + apellido
        let campoUsuario = document.getElementById("nombreUsuario").innerHTML = nombreCompleto
      
	}catch (error){
		console.log(error)
	}

}

const salir = () => {

    if (validacion === false) {
        window.location.replace("http://localhost:5501/Banco-FE/index.html"); 
    }
}    

let btnSalir = document.getElementById('btnSalir');
btnSalir.addEventListener('click',salir);

traerUsuario();