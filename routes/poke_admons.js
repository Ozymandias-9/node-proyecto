const express = require ('express');
const poke_admons = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');
const table= "poke_admons";

poke_admons.post("/signin", async (req, res, next)=>{
    const {nombre, apellido, telefono, correo, direccion, password} = req.body;

    if (nombre && apellido && telefono && correo && direccion && password){
    let query = `INSERT INTO  ${table} (nombre, apellido, telefono, correo, direccion, password) `;
        query += `VALUES ('${nombre}', '${apellido}', '${telefono}', '${correo}', '${direccion}', '${password}');`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1){
        return res.status(201).json({code: 201, message: "Admon registrado correctamente."});
    }
    return res.status(500).json({code: 500, message: "Ocurrió un error."});
}
return res.status(500).json({code: 500, message: "Ocurrió un error."});
});

poke_admons.post("/login", async (req, res, next) => {
    const {correo, password} = req.body;
    const query = `SELECT * FROM ${table} WHERE correo = '${correo}' AND password = '${password}';`;
    const rows = await db.query(query);

    if (correo && password){
        if(rows.length == 1){
            const token = jwt.sign({
                id: rows[0].id,
                correo: rows.correo
            }, "debugkey");
            return res.status(200).json({code: 200, message: token });
        }
        else{
            return res.status(200).json({code: 200, message: "Usuario y/o contraseña incorrectos"});
        }
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});


poke_admons.get("/", async (req, res, next) =>{
    const query = `SELECT * FROM  ${table}`;
    const rows = await db.query(query);
    
    return res.status(200).json({code: 200, message: rows});
});

module.exports = poke_admons;