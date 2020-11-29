window.onload = init;

function init (){
    if(!localStorage.getItem("token")){
        // document.querySelector('.btn-secondary').addEventListener('click', function(){
        //     window.location.href = "signin.html";
        // });
    
        document.querySelector('.btn-primary').addEventListener('click', login);
    }
    else{
        window.location.href="empleados.html";
    }
}

function login(){
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    console.log(mail,pass);

    axios({
        method: 'post',
        url: 'http://localhost:3000/poke_admons/login',
        data: {
            correo: mail,
            password: pass
        }
    }).then(function(res) {
        console.log(res);
        if(res.data.code === 200){
            localStorage.setItem("token", res.data.message);
            window.location.href = "empleados.html";
        }
        else{
            alert("Usuario y/o contraseña incorrecto");
        }
    }).catch(function(err) {
        console.log(err);
    });
}d