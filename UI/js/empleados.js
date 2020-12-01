window.onload = init;
var headers = {};
var url = "http://localhost:3000/poke_empleados";

var agregar = true;

const agregar_contenedor = document.getElementById('container_agregar');
const editar_contenedor = document.getElementById('container_editar');
const eliminar_contenedor = document.getElementById('container_eliminar');

const agregar_popup_titulo = document.getElementById('agregar_popup_titulo');
const Btn_Guardar = document.getElementById('Btn_Guardar');
const eliminar_Texto = document.getElementById('eliminar_Texto');

const Btn_Buscar = document.getElementById("Btn_Buscar");
const Txt_Buscar = document.getElementById("Txt_Buscar");

const input_name = document.getElementById('input_name');
const input_last_name = document.getElementById('input_last_name');
const input_address = document.getElementById('input_address');
const input_phone_number = document.getElementById('input_phone_number');
const input_email = document.getElementById('input_email');
const input_password = document.getElementById('input_password');


function init() {
    if (localStorage.getItem("token")) {
            headers = {
                headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            } 
        }
     loadEmpleados();
    } else { 
        window.location.href = "index.html"
    }
}
function cerrarSesion (){
    localStorage.removeItem("token");
    window.location.href="login.html";
}

function abrirAgregar() {
    agregar = true;
    agregar_popup_titulo.textContent = `Registrar empleado.`;
    agregar_contenedor.classList.add("active");

    agregar_popup_titulo.textContent = "Agregar nuevo empleado.";

    input_name.value = "";
    input_last_name.value = "";
    input_address.value = "";
    input_phone_number.value = "";
    input_email.value = "";
    input_password.value = "";

}
function abrirEditar(index) {
    agregar = false;
    agregar_popup_titulo.textContent = `Editar empleado.`;
    agregar_contenedor.classList.add("active");
    console.log("Index: ");
    console.log(index);
    
    let empleado = empleados[index];

    idSelected = empleado.id;
    console.log("Id Seleccionado: ");
    console.log(idSelected);

    console.log("Empleados desde abrirEditar: ");
    console.log( empleados)
    console.log("Empleado seleccionado: ");
    console.log(empleado);
    
    input_name.value = empleado.nombre;
    input_last_name.value = empleado.apellido;
    input_address.value = empleado.direccion;
    input_phone_number.value = empleado.telefono;
    input_email.value = empleado.correo;
    input_password.value = empleado.password;
}
function botonDialogoClick() {
    if (agregar == true) {
        addEmpleado();
    }
    else {
        editEmpleado();
    }
}
function abrirEliminar(index) {
    let empleado = empleados[index];

    idSelected = empleado.id;
    console.log("Id Seleccionado: ");
    console.log(idSelected);

    console.log("Empleados desde abrirEditar: ");
    console.log( empleados)
    console.log("Empleado seleccionado: ");
    console.log(empleado);

    eliminar_Texto.value = `¿Eliminar a ${empleado.nombre} de forma permanente?`;

    eliminar_contenedor.classList.add("active");
}

function cerrarDialogos() {
    const dialogs = document.getElementsByClassName("popup-container");
    for (var dialog of dialogs) { 
        console.log(dialog);
        console.log(dialog.classList);
        dialog.classList.remove("active");
    }
}

function displayEmpleados() {
    console.log("Empleados desde displayEmpleados: ");
    console.log( empleados)
    limpiarFilas();
    for(let i = 0; i < empleados.length; i++) {
        tabla_datos.appendChild(generarFila(empleados[i], i));
    }
}

// const open = document.getElementById('open');
// const close = document.getElementById('close');
// const container = document.getElementById('container');

// open.addEventListener('click', () => {
// 	container.classList.add("active");
// });

// close.addEventListener('click', () => {
// 	container.classList.remove("active");
// });