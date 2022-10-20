const login = () => {
	user = '',
	password = ''
}

const llamada = async () => {
	try{
		let response = await fetch('http://localhost:8080/api/v1/usuario').then(res => res.json())
		console.log(response)
	}catch (error){
		console.log(error)
	}
   
    
}

llamada()


const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
	item.addEventListener('click', function() {
		switchers.forEach(item => item.parentElement.classList.remove('is-active'))
		this.parentElement.classList.add('is-active')
	})
})


