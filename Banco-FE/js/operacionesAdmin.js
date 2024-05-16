const id = "id";
const user = "user";
const nrocta = "nrocta";
const cbu = "cbu";
const saldo = "saldo";
const nombre = "nombre";
const apellido = "apellido";
const dni = "dni";
const direccion = "direccion";
const telefono = "telefono";
const mail = "mail";



const consultaUsuarios = async () => {
	    try{
		    let response = await fetch('http://localhost:8080/api/v1/usuario/').then(res => res.json())
            console.log(response)
            const campoUsuario = document.getElementById("usuarios") 
            document.getElementById("usuarios").style.visibility = "visible"
            for(let i=0; i<response.length; i++){
                const users = document.createElement("tr");
                const users1 = document.createElement("td");
                const users2 = document.createElement("td");

                users1.textContent = response[i][id];  
                users2.textContent = response[i][user];
                
                users.appendChild(users1);
                users.appendChild(users2);
                campoUsuario.appendChild(users);

                
                console.log(response[i][user]) 
            }
	    }catch (error){
		    console.log(error)
	    }
}



let consulta = document.getElementById("listarUsuarios");
consulta.addEventListener("click",consultaUsuarios);

const consultaNumeroCuentas = async () => {
    try{
        let response = await fetch('http://localhost:8080/api/v1/cuentas/').then(res => res.json())
        console.log(response)
        const campoCuentas = document.getElementById("cuentas") 
        document.getElementById("cuentas").style.visibility = "visible" 
        for(let i=0; i<response.length; i++){
            const cuentas = document.createElement("tr");
            const cuentas1 = document.createElement("td");
            const cuentas2 = document.createElement("td");
            const cuentas3 = document.createElement("td");
            const cuentas4 = document.createElement("td");

            cuentas1.textContent = response[i][id];
            cuentas2.textContent = response[i][nrocta];
            cuentas3.textContent = response[i][cbu];
            cuentas4.textContent = response[i][saldo];
            cuentas.appendChild(cuentas1);
            cuentas.appendChild(cuentas2);
            cuentas.appendChild(cuentas3);
            cuentas.appendChild(cuentas4);
            campoCuentas.appendChild(cuentas);
            console.log(response[i][cuentas]) 
        }
             
    }catch (error){
        console.log(error)
    }
}

let consulta1 = document.getElementById("listarCuentas");
consulta1.addEventListener("click",consultaNumeroCuentas);

const consultaIndividuos = async () => {
    try{
        let response = await fetch('http://localhost:8080/api/v1/individuo/').then(res => res.json())
        
        
        const campoIndividuo = document.getElementById("individuo") 
        document.getElementById("individuo").style.visibility = "visible"
        for(let i=0; i<response.length; i++){
            const individuo = document.createElement("tr");
            const individuo1 = document.createElement("td");
            const individuo2 = document.createElement("td");
            const individuo3 = document.createElement("td");
            const individuo4 = document.createElement("td");

            individuo1.textContent = response[i][id];  
            individuo2.textContent = response[i][nombre];
            individuo3.textContent = response[i][apellido];
            individuo4.textContent = response[i][dni];

            individuo.appendChild(individuo1);
            individuo.appendChild(individuo2);
            individuo.appendChild(individuo3);
            individuo.appendChild(individuo4);
            campoIndividuo.appendChild(individuo);
        }

    }catch (error){
        console.log(error)
    }
}



let consulta2 = document.getElementById("listarIndividuo");
consulta2.addEventListener("click",consultaIndividuos);

const consultaClientes = async () => {
    try{
        let response = await fetch('http://localhost:8080/api/v1/cliente/').then(res => res.json())
        
        
        const campoCliente = document.getElementById("cliente") 
        document.getElementById("cliente").style.visibility = "visible"
        for(let i=0; i<response.length; i++){
            const clientes = document.createElement("tr");
            const cliente1 = document.createElement("td");
            const cliente2 = document.createElement("td");
            const cliente3 = document.createElement("td");
            const cliente4 = document.createElement("td");


            cliente1.textContent = response[i][id];  
            cliente2.textContent = response[i][telefono];
            cliente3.textContent = response[i][direccion];
            cliente4.textContent = response[i][mail];
          
            clientes.appendChild(cliente1);
            clientes.appendChild(cliente2);
            clientes.appendChild(cliente3);
            clientes.appendChild(cliente4);
            campoCliente.appendChild(clientes);
        }

    }catch (error){
        console.log(error)
    }
}



let consulta3 = document.getElementById("listarClientes");
consulta3.addEventListener("click",consultaClientes);