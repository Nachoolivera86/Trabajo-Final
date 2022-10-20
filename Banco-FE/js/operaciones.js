

const consultaSaldo = async () => {
	try{
		let response = await fetch('http://localhost:8080/api/v1/cuenta/5').then(res => res.json())
		//console.log(response)
        mostrarSaldo(response);


	}catch (error){
		console.log(error)
	}
   
    
}

let consulta = document.getElementById("consultar");
consulta.addEventListener("click",consultaSaldo);

let extraccion = document.getElementById("consultar");
extraccion.addEventListener("click",saldoOnOff);


//consultaSaldo();
function mostrarSaldo(paramResponse) {
    console.log(paramResponse)
    console.log(paramResponse[0].Saldo)
    
    let html = "";
         html += `${paramResponse[0].Saldo}
        
           `;
    
    document.querySelector("#mostrarSaldo").innerHTML = html;
}


function saldoOnOff(){
    document.querySelector("#ocultarsaldo").classList.add('ocultarDisplay');
    document.querySelector('#mostrarsaldo').classList.add('mostrarDisplay');

}

