let response = [];
let validacion = false;
let id = "";
let usuario = "";


function login(){
	let user = document.getElementById("login-user").value;
	let password = document.getElementById("login-password").value;
	
	for(let i = 0; i<= response.length;i++){
		try{
		if(user === response[i].User && password === response[i].Password){
			validacion = true;
			id = response[i].Id;
			usuario = response[i].User;
		}
	}catch(error){
			console.log(error);
		}
	}
	user = "";
	password ="";
	console.log(validacion);
		if(validacion === true){
		//window.location.href = "./operaciones.html";
			redireccionar();
	}	
}

let btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click',login);

const llamada = async () => {
	try{
		let resp = await fetch('http://localhost:8080/api/v1/usuario').then(res => res.json())
		response = resp;
		console.log(response)
	}catch (error){
		console.log(error)
	}
}


function redireccionar(){
	console.log("llegue a redireccionar");
	
	window.location.replace("http://localhost:5500/Banco-FE/operaciones.html?Id="+id+"&User="+usuario);
}

llamada();



