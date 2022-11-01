let params = new URLSearchParams(location.search);
let id = params.get('Id');
let usuario = params.get('User');



const consultaSaldo = async () => {
	try{
		let response = await fetch('http://localhost:8080/api/v1/cuenta/'+id).then(res => res.json())
		//console.log(response)
        mostrarSaldo(response);


	}catch (error){
		console.log(error)
	}
}


let consulta = document.getElementById("consultar");
consulta.addEventListener("click",consultaSaldo);

const consultaCbu = async () => {
	try{
		let response = await fetch('http://localhost:8080/api/v1/cuenta/'+id).then(res => res.json())
		//console.log(response)
        mostrarCbu(response);


	}catch (error){
		console.log(error)
	}
}


let consulta1 = document.getElementById("consultarCbu");
consulta1.addEventListener("click",consultaCbu);




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



const depositarImporte = async () =>{
   let paramResponse = 0
    try{
		let response = await fetch('http://localhost:8080/api/v1/cuenta/'+id).then(res => res.json())
		paramResponse = Number(response[0].saldo); 
        console.log(paramResponse)
	}catch (error){
		console.log(error)
	}

    let deposito = Number(prompt("Ingrese un importea depositar:" ));
    deposito = deposito + paramResponse;
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
         }
         else {
             console.log("todo mal")
         }
    } catch (error) {
        console.log("salio por el catch");
    }

 

}

let depositar = document.getElementById("depositar");
depositar.addEventListener("click",depositarImporte);

let extraerSaldo = async () => {
    let paramResponse = 0
    try{
		let response = await fetch('http://localhost:8080/api/v1/cuenta/'+id).then(res => res.json())
		paramResponse = Number(response[0].saldo); 
        console.log(paramResponse)
	}catch (error){
		console.log(error)
	}
    let extraccion = Number(prompt("Ingrese un importe a extraer:" ));
    if (extraccion > paramResponse) {
        alert("Saldo insuficiente");
    } else {
        alert("Extraccion correcta");
        let deposito = paramResponse - extraccion;
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
             }
             else {
                 console.log("todo mal")
             }
        } catch (error) {
            console.log("salio or el catch");
        }
    }
    
  

}



let extraccion = document.getElementById("extraccion");
extraccion.addEventListener("click",extraerSaldo);


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
            console.log("salio or el catch");
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

traerUsuario();