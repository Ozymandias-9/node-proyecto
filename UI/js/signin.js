window.onload = init;

function init (){
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-secondary').addEventListener('click', function(){
            window.location.href = "login.html";
        });
    
        document.querySelector('.btn-primary').addEventListener('click', signin);
    }
    else{
        window.location.href="empleados.html";
    }
}

function signin(){
    var name = document.getElementById('input_name').value;
    var last_name = document.getElementById('input_last_name').value;
    var address = document.getElementById('input_address').value;
    var phone_number = document.getElementById('input_phone_number').value;
    var mail = document.getElementById('input_email').value;
    var pass = document.getElementById('input_password').value;


    axios({
        method: 'post',
        url: 'http://localhost:3000/poke_admons/signin',
        data: {
            nombre: name,
            apellido: last_name,
            correo: mail,
            direccion: address,
            telefono: phone_number,
            password: pass
        }
    }).then(function(res) {
        console.log(res);
        alert("Registro exitoso.");
        window.location.href = "login.html";
    }).catch(function(err) {
        console.log(err);
    });
 };