const express = require ('express');
const poke_empleados = express.Router();
const db = require('../config/database');
const tabla = 'poke_empleados';

poke_empleados.post("/", async (req,res,next) => {
    const { nombre, apellido, telefono, correo, direccion, password } = req.body;

    if (nombre && apellido && telefono && correo && direccion && password) {
        let query = `INSERT INTO ${tabla} (nombre, apellido, telefono, correo, direccion, password)`;
        query += ` VALUES('${nombre}', '${apellido}', '${telefono}', '${correo}', '${direccion}', '${password}')`;
        const rows = await db.query(query);
        
        if (rows.affectedRows == 1){
            return res.status(201).json({ code: 201, message: "Empleado insertado correctamente"});
        }
        return res.status(500).json({code: 500, messaege: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

poke_empleados.delete("/:id([0-9]{1,3})", async (req, res, next) =>{
    const query = `DELETE FROM ${tabla} WHERE id=${req.params.id}`;

    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Empleado borrado correctamente. Despedido. Hasta la próxima."});
    }
    return res.status(200).json({code: 404, message: "Pokémon no encontrado."});
});

poke_empleados.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const { nombre, apellido, telefono, correo, direccion, password } = req.body;
    
    if (nombre && apellido && telefono && correo && direccion && password){
        let query = `UPDATE ${tabla} SET nombre='${nombre}',apellido='${apellido}',`;
        query += ` telefono='${telefono}',correo='${correo}',direccion='${direccion}',password='${password}' WHERE id=${req.params.id}`;
        
        const rows = await db.query(query);

        if (rows.affectedRows == 1){
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente"});
        }
        return res.status(500).json({code: 500, messaege: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

poke_empleados.patch("/:id([0-9]{1,3})", async (req, res, next) =>{
    if (req.body.nombre){
        let query = `UPDATE ${tabla} SET nombre='${req.body.nombre}' WHERE id=${req.params.id}`;
        
        const rows = await db.query(query);

        if (rows.affectedRows == 1){
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error."});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos."});
});

poke_empleados.get("/", async (req,res,next) => {
    const pkmn = await db.query(`SELECT * FROM ${tabla}`);
    return res.status(200).json({ code: 1, message: pkmn });
});

// poke_empleados.get('/:id([0-9]{1,3})', async (req,res,next) => {
//     const id = req.params.id;
//     if (id >= 1 && id <= 722) {
//         const pkmn = await db.query(`SELECT * FROM ${tabla} WHERE id= ${id};`);
//         return res.status(200).json({code: 200, message: pkmn});
//     }
//     return res.status(404).send({code: 404, message: "Empleado no encontrado."}); 
// });

// poke_empleados.get('/:name([A-Za-z]+)', async (req, res, next) => {
//     const name = req.params.nombre;
//     console.log(req.params);
//     console.log("Hola xd");
//     const pkmn = await db.query(`SELECT * FROM ${tabla} WHERE nombre='${name}';`);
//         if (pkmn.length>0) {
//         return res.status(200).json({code: 200, message: pkmn})     
//         }
//         return res.status(404).send({code: 404, message: "Empleado no encontrado."});
// });
 
// poke_empleados.get('/:nombre', async (req,res,next) => {
//     // const pkmn = await db.query(`SELECT * FROM ${tabla} where nombre like '%${nombre}%' and apellido like '%${nombre}%' and correo like '%${nombre}%';`);
//     const name = req.params.nombre;
//     const pkmn = await db.query(`SELECT * FROM ${tabla} WHERE nombre='${name}';`);
//         if (pkmn.length>0) {
//         return res.status(200).json({code: 200, message: pkmn})     
//         }
//         return res.status(404).send({code: 404, message: "Empleado no encontrado."});
// });

module.exports = poke_empleados;