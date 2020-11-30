
function limpiarFilas() {
    for(let i = tabla_datos.rows.length - 1; i > 0; i--){
        tabla_datos.deleteRow(i);
    }
}

function generarFila(empleado, index) {
    let row = document.createElement("tr");
    row.className = "table_rowcontent";    
    row.appendChild(generarColumna(empleado.nombre));
    row.appendChild(generarColumna(empleado.apellido));
    row.appendChild(generarColumna(empleado.correo));
    row.appendChild(generarColumna(empleado.direccion));
    row.appendChild(generarColumna(empleado.telefono));

    row.appendChild(generarBotones());
    row.id = index;
    return row;
}
function generarColumna(texto) {
    let column = document.createElement("td");
    column.textContent = texto;
    return column;
}
function generarBotones() {
    let column = document.createElement("td");
    column.appendChild(generarBotonEditar());
    column.appendChild(generarBotonEliminar());
    return column;
}
function generarBotonEditar() {
    let boton = document.createElement("button");
    let span = document.createElement("span");
    span.className = "far fa-edit";
    boton.appendChild(span);
    boton.addEventListener('click', (e) => {
        //console.log( "[2] Id de la fila: "+ e.path[2].id );
        //console.log( "[3] Id de la fila: "+ e.path[3].id );
        abrirEditar(e.path[3].id);
        // console.log(e.path[2]);
        // console.log(e.path[2].id);
        // idSelected = e.path[2].id;

    });
    return boton;
}
function generarBotonEliminar() {
    let boton = document.createElement("button");
    let span = document.createElement("span");
    span.className = "far fa-trash-alt";
    boton.appendChild(span);
    boton.addEventListener('click', (e) => {
        abrirEliminar(e.path[3].id);
        // idSelected = ;
    });
    return boton;
}
function buscarEmpleado(){
    document.querySelector('.Btn-buscar').addEventListener('click', loadEmpleados);
}