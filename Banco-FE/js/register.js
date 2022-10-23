
let user = "";
let password = "";
let checkPass = "";
let respuestaALlamada;

function registrar(){
    user = document.getElementById("login-user1").value;
    password = document.getElementById("login-password1").value;
    checkPass = document.getElementById("login-password2").value;
    console.log(user);
    console.log(password);
    console.log(checkPass);



    if(password === checkPass){
        registrarUsuario();
    }else{
        console.log("datos invalidos");
    }
}







const llamada = async () => {
	try{
		let resp = await fetch('http://localhost:8080/api/v1/usuario').then(res => res.json())
		respuestaALlamada = resp;
    }catch (error){
		console.log(error)
	}
}


const registrarUsuario = async () => {

    console.log(user);
    console.log(password);
    console.log(checkPass);


    let ultimoId = (respuestaALlamada.length) + 1;
    console.log(ultimoId);
    let data2 = {
        "Id" : ultimoId,
        "User": user,
        "Password": password
    }
    try {
        let response3 = await fetch('http://localhost:8080/api/v1/usuario/insert', {
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
        console.log("salio or el catch");
    }
}


let btnRegistrar = document.getElementById("btnContinue");
btnRegistrar.addEventListener("click",registrarUsuario);


llamada();