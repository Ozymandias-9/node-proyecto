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

app.get("/", index);

// app.use("/poke_admons", poke_admons);
app.use("/poke_empleados",poke_empleados);

app.use(auth);

app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
console.log("Server is running...");
});
