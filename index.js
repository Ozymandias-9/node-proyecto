//Dependencias
const morgan = require ('morgan');
const express = require('express');
//Importa la libreria de express
const app = express();
//Obtener instancia, llama al constructor de express, acceso a express
//Routers
const poke_empleados = require('./routes/poke_empleados');
const poke_admons = require ('./routes/poke_admons');
//Middleware
const auth = require ('./middleware/auth');
const notFound = require ('./middleware/notFound');
const index = require ('./middleware/index')
const cors = require ('./middleware/cors')

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({  extended: true }));
/*
Verbos HTTP:
recurso: Registro en alguna base de datos
GET: Obtener un recurso
POST: Almacenar, crear recursos
PUT: Modificar todos los recursos
PATCH: Actualización de un dato de un recurso
DELETE: Eliminar un recurso
*/

app.get("/", index);

//Primer parametro, URL que va a recibir 
//Segundo parametro, funcion a ejectuar
/* 
req: Peticion del cliente (request)
res: La respuesta que vamos a dar (response)
next: ...
 */
app.use("/poke_admons", poke_admons);

app.use(auth);

app.use("/poke_empleados",poke_empleados);

app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
console.log("Server is running...");
});
//Primer parametro, puerto del servidor
//Segundo parametro, funcion a ejectuar
 
/* app.listen(3000, function(){
    
})

Se puede abrir con:
localhost:3000
127.0.0.1:3000
IP:3000

*/