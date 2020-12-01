var url = "http://localhost:3000/poke_empleados";


function loadEmpleados() {
    axios.get(url + "/" + Txt_Buscar.value, headers)
    .then(function(res) { 
		console.log(res);
		empleados = res.data.message;
        displayEmpleados();
    }).catch(function(err) {
        console.log(err);
    })
}
function addEmpleado() {
    let name = input_name.value;
    let lastName = input_last_name.value;
    let address = input_address.value;
    let phoneNumber = input_phone_number.value;
    let email = input_email.value;
	let password = input_password.value;
	
    axios(
        {
            method: 'post',
            url: url,
            headers: headers.headers,
            data: {
                nombre: name,
                apellido: lastName,
                direccion: address,
                telefono: phoneNumber,
                correo: email,
                password: password
            }
        }
    )
    .then(function(res) { 
        console.log(res);
        cerrarDialogos();
        loadEmpleados();
    }).catch(function(err) {
        console.log(err);
    })
}
function editEmpleado() {
    let name = input_name.value;
    let lastName = input_last_name.value;
    let address = input_address.value;
    let phoneNumber = input_phone_number.value;
    let email = input_email.value;
	let password = input_password.value;
	

    axios(
        {
            method: 'put',
            url: url+ "/" +idSelected,
            headers: headers.headers,
            data: {
                nombre: name,
                apellido: lastName,
                direccion: address,
                telefono: phoneNumber,
                correo: email,
                password: password
            }
        }
    )
    .then(function(res) { 
        console.log(res);
        cerrarDialogos();
        loadEmpleados();
    }).catch(function(err) {
        console.log(err);
    })
}
function deleteEmpleado (){
    axios.delete(url+ "/" + idSelected, headers)
    .then(function(res) { 
        cerrarDialogos();
        loadEmpleados();
    }).catch(function(err) {
        console.log(err);
    })
}

loadEmpleados();