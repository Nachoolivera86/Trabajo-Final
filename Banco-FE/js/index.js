let response = [];
let validacion = false;
let id = "";
let usuario = "";


function login(){
	let user = document.getElementById("login-user").value;
	let password = document.getElementById("login-password").value;
	
	for(let i = 0; i<= response.length;i++){
		try{
			if(user === response[i].user && password === response[i].password){
			validacion = true;
			id = response[i].id;
			usuario = response[i].user;
			console.log(usuario);
			}else {
				
			}

			if (usuario === 'Banquero') {
				console.log("Soy el administrador")
				validacion = false;
				redireccionarAdministrador();
			} 
		}
		catch(error){
			console.log(error);
		}
	} 
	
	user = "";
	password ="";
	console.log(validacion);
		if(validacion === true){
			redireccionarOperaciones();
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


function redireccionarAdministrador(){
	console.log("llegue a menu Administrador");
	window.location.replace("http://localhost:5500/Trabajo-Final/Banco-FE/operacionesAdmin.html");



}

function redireccionarOperaciones(){
	console.log("llegue a redireccionar");
	

	window.location.replace("http://localhost:5500/Trabajo-Final/Banco-FE/operaciones.html?Id="+id+"&User="+usuario);
}

llamada();

