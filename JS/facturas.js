const d = document;

import btn_modulos from "./script.js";
import { validarNumeroFactura, validarNombreCompleto, validarNumeroDocumento, validarTelefono, validarNumeroEntero, validarNumeroDecimal } from './validaciones.js';


cargar_factura("#carga_facturas");

//Evento Click
d.addEventListener("click", (e) => {
  if (e.target.matches("#nueva_factura")) {
    crear_factura("#nueva_factura", "#vista_factura");
  }  
  if (e.target.matches("#generar_factura")) {
    guardar_factura();
  }
  
});

function cargar_factura(tabla_facturas) {
  const tabla = d.querySelector(tabla_facturas);
  const url = "../facturas/tabla_facturas.php";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      tabla.innerHTML = xhr.responseText;
      seleccionar_filas(tabla_facturas);
    }
  };
}

/*      const filas = d.querySelectorAll(`${tabla_facturas} tbody tr`);
        filas.forEach((fila) => {
          fila.addEventListener("click", (e) => {
            const numero = fila.querySelector("td:nth-child(1)").textContent;
            console.log(numero);
            ver_factura(numero)
          });
  
          // Agregamos el listener para cada fila de la tabla fuera del listener para el botón "Crear"
          fila.addEventListener("click", () => {
            // Quitamos la clase "seleccionado" de todas las filas
            filas.forEach((fila) => {
              fila.classList.remove("seleccionado");
            });
  
            // Agregamos la clase "seleccionado" a la fila seleccionada
            fila.classList.add("seleccionado");
  
            // Agregamos listener para los botones de la fila seleccionada
            // const botones = fila.querySelectorAll("td button");
            // botones.forEach((boton) => {
            //   boton.addEventListener("click", (e) => {
            //     e.stopPropagation(); // Para evitar que el click se propague a la fila
            //     const numero = fila.querySelector("td:nth-child(1)").textContent;
            //     console.log(numero);
            //     // Aquí puedes hacer lo que necesites con el número de factura
            //   });
            // });
            
          });
        });*/

function seleccionar_filas(tabla_facturas) {
  const filas = d.querySelectorAll(`${tabla_facturas} tbody tr`);
  filas.forEach((fila) => {
    fila.addEventListener("click", (e) => {
      const numero = fila.querySelector("td:nth-child(1)").textContent;

      if (!e.target.matches("#imprimir")&&!e.target.matches("#editar")&& !e.target.matches("#eliminar")) {
        // console.log(numero);
        console.log("dIFERENTE----------");
        ver_factura(numero);
      }
      if (e.target.matches("#imprimir")) {
        console.log("Has precionado el BOTTON IMRPIMIR");
        const $vista_factura = d.querySelector("#vista_factura");
        console.log($vista_factura);
        $vista_factura.innerHTML = "";
        imprimir_factura(numero);
        console.log(numero);

      }
      if (e.target.matches("#editar")) {
        // ver_factura(numero);
        // console.log("editar----------");
        editar_factura(numero);
      }
      if (e.target.matches("#eliminar")) {
        eliminar_factura(numero)
      }

    });

    // Agregamos el listener para cada fila de la tabla fuera del listener para el botón "Crear"
    fila.addEventListener("click", () => {
      // Quitamos la clase "seleccionado" de todas las filas
      filas.forEach((fila) => {
        fila.classList.remove("seleccionado");
      });

      // Agregamos la clase "seleccionado" a la fila seleccionada
      fila.classList.add("seleccionado");
    });
  });


  const inputBusqueda = d.querySelector("#search-input");
  inputBusqueda.addEventListener("input", () => {
    const valorBusqueda = inputBusqueda.value.trim().toLowerCase();
    filas.forEach((fila) => {
      const nummeroFactura = fila.querySelector("td:nth-child(1)").textContent;
      const nombreCliente = fila.querySelector("td:nth-child(2)").textContent.toLowerCase();
  
      if (nummeroFactura.includes(valorBusqueda) || nombreCliente.includes(valorBusqueda)) {
        fila.classList.remove("oculto");
      } else {
        fila.classList.add("oculto");
      }
    });
  });
  
  
}

function eliminar_factura(n) {
  // ver_factura(n).then(() => {
    const num = n;
    // console.log('eliminar');
    // const confirmacion = confirm("¿Desea eliminar el usuario seleccionado?");
    const limpiar_vista = d.querySelector('#vista_factura');
    // if (confirmacion) {
      const data = `eliminar=true&numero_factura=${num}`;
      const url = `../facturas/eliminar_factura.php`;

      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader(
        "content-type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );
      xhr.send(data);
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          // const resp = JSON.parse(xhr.responseText);
          const resp = (xhr.responseText);
          console.log(resp);
          // if (resp.estado) {
            limpiar_vista.innerHTML = "";
            // alert("factura eliminado correctamente");
            cargar_factura("#carga_facturas");

            // const fila_seleccionada = d.querySelector(".seleccionado");
            // const tabla = d.querySelector("#tabla");
            // if (tabla.contains(fila_seleccionada)) {
            //   // tabla.removeChild(fila_seleccionada);
            // }
          //   fila_seleccionada.removeEventListener("click", () => {});
          // } else {
          //   alert("Error al eliminar la factura");
          // }
        }
      };
    // }
  // });
  
}


function editar_factura(n) {
  ver_factura(n).then(() => {
  // console.log('EDITARR');
  const num = n;
  const elements = d.querySelectorAll(".v_factura .div1 [disabled]");
  const v_fac = d.querySelector(".v_factura");
  elements.forEach((element) => {
    element.removeAttribute("disabled");
  });

  const btn_guardar = document.createElement("button");
  btn_guardar.innerText = "Guardar factura editada";
  btn_guardar.id = "guardar_fac_editada";
  btn_guardar.classList.add("btn", "btn-success"); // Agrega las clases "btn" y "btn-success" al botón
  v_fac.appendChild(btn_guardar);

  const inputCantidad = d.getElementById("cantidad");
  const inputPrecio = d.getElementById("precio");
  const inputTotal = d.getElementById("total");

  inputCantidad.oninput = calcularTotal;
  inputPrecio.oninput = calcularTotal;

  function calcularTotal() {
    const cantidad = inputCantidad.value;
    const precio = inputPrecio.value;
    const total = cantidad * precio;
    inputTotal.value = total;
  }



  btn_guardar.addEventListener("click", (e) => {
    const number_f = d.getElementById("numero_factura").value;
    const numero_factura_original = num; // guardar el valor original
    const nombre_c = d.getElementById("nombre_c").value;
    const documento_c = d.getElementById("documento_c").value;
    const telefono_c = d.getElementById("telefono_c").value;
    const nombre_produc = d.getElementById("nombre_produc").value;
    const cantidad = d.getElementById("cantidad").value;
    const precio = d.getElementById("precio").value;
    const total = d.getElementById("total").value;

    if(number_f== ''){
      alert('El campo de factura es Obligatorio');
      return false;
    }else if(! validarNumeroFactura(number_f)){
      alert('El numero de factura no es Valido');
      return false;
    }
    if(nombre_c== ''){
      alert('El campo de nombre es Obligatorio');
      return false;
    }else if(! validarNombreCompleto(nombre_c)){
      alert('El nombre no es Valido');
      return false;
    }
    if(documento_c== ''){
      alert('El campo de documento es Obligatorio');
      return false;
    }else if(! validarNumeroDocumento(documento_c)){
      alert('El documento no es Valido');
      return false;
    }
    if(telefono_c== ''){
      alert('El campo de telefono es Obligatorio');
      return false;
    }else if(! validarTelefono(telefono_c)){
      alert('El telefono no es Valido');
      return false;
    }
    if(nombre_produc== ''){
      alert('El campo de nombre producto es Obligatorio');
      return false;
    }else if(! validarNombreCompleto(nombre_produc)){
      alert('El nombre del producto no es Valido');
      return false;
    }
    if(cantidad== ''){
      alert('El campo de cantidad es Obligatorio');
      return false;
    }else if(! validarNumeroEntero(cantidad)){
      alert('La cantidad no es Valida');
      return false;
    }
    if(precio== ''){
      alert('El campo de precio es Obligatorio');
      return false;
    }else if(! validarNumeroDecimal(precio)){
      alert('El precio no es Valida');
      return false;
    }


    const data = `guardar=true&numero_factura=${number_f}&numero_factura_original=${numero_factura_original}&nombre_c=${nombre_c}&documento_c=${documento_c}&telefono_c=${telefono_c}&nombre_produc=${nombre_produc}&cantidad=${cantidad}&precio=${precio}&total=${total}`;

    const url = `../facturas/editar_factura.php`;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader(
    "content-type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );
  xhr.send(data);
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      const resp = JSON.parse(xhr.responseText);
      // const resp = (xhr.responseText);
      // console.log(resp);
      // TABLA factura
      if (resp.estado) {
        cargar_factura("#carga_facturas");
        btn_guardar.disabled = true;
        elements.forEach((element) => {
          element.disabled = true;
        });
        alert("DATOS GUARDADOS CORRECTAMENTE");
      } else {
        alert(resp.mensaje);
      }
    }
  };
});

});
}

// Agregamos listener para los botones de la fila seleccionada
// const botones = fila.querySelectorAll("td button");
// botones.forEach((boton) => {
//   boton.addEventListener("click", (e) => {
//     e.stopPropagation(); // Para evitar que el click se propague a la fila
//     const numero = fila.querySelector("td:nth-child(1)").textContent;
//     console.log(numero);
//     // Aquí puedes hacer lo que necesites con el número de factura
//   });
// });

function ver_factura(num) {

 const $seccion_tabla = d.querySelector('#carga_facturas');
  $seccion_tabla.classList.add('largo_seccion_tabla');
  console.log('VER FACTURA');
  // console.log(doc);
  const numero_factura = num;
  const $vista_factura = d.querySelector("#vista_factura");
  const btn_editar = d.querySelector("#editar");
  
  const url = `../facturas/ver_factura.php?num=${numero_factura}`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();
  return new Promise((resolve, reject) => {

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {

    $vista_factura.innerHTML = xhr.responseText;
   console.log('FIN ver---');
   resolve(); // Resuelve la Promesa

      // editar_factura(numero_factura);
    
      // const respo = xhr.responseText;
      // console.log(respo);

      // d.addEventListener("click", (e) => {
      // if(e.target.matches(("#imprimir"))){
      //   console.log('holaa');

      // }else{


      // console.log( $vista_factura);
      
      // btn_editar.addEventListener("click", () => {
        // ver_factura(num)
        // console.log('-----/////------');
        // const numero_factura = d.getElementById("numero_factura").value;

      // });
      

      // seleccionar_filas()
      // }
      // });

      // eliminar_usuario("#eliminar_user", documento_usuario, "#ver_usuario");
    }
  };
});
}



function crear_factura(nueva_f, vista_f) {

  const $nueva_factura = d.querySelector(nueva_f);
  const $vista_factura = d.querySelector(vista_f);

  const url = `../facturas/vista_nueva_factura.php`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      $vista_factura.innerHTML = xhr.responseText;

      const inputCantidad = document.getElementById("cantidad");
      const inputPrecio = document.getElementById("precio");
      const inputTotal = document.getElementById("total");

      inputCantidad.oninput = calcularTotal;
      inputPrecio.oninput = calcularTotal;

      function calcularTotal() {
        const cantidad = inputCantidad.value;
        const precio = inputPrecio.value;
        const total = cantidad * precio;
        inputTotal.value = total;
      }
    }
  };
}


function guardar_factura() {
  const elements = d.querySelectorAll(".v_factura .div1 *:not([disabled])");
  const btn_generar = d.querySelector("#generar_factura");
  const number_f = d.getElementById("numero_factura").value;
  const nombre_c = d.getElementById("nombre_c").value;
  const documento_c = d.getElementById("documento_c").value;
  const telefono_c = d.getElementById("telefono_c").value;
  const nombre_produc = d.getElementById("nombre_produc").value;
  const cantidad = d.getElementById("cantidad").value;
  const precio = d.getElementById("precio").value;
  const total = d.getElementById("total").value;
  const nombre_creador = d.getElementById("nombre_creador").value;

  if(number_f== ''){
    alert('El campo de factura es Obligatorio');
    return false;
  }else if(! validarNumeroFactura(number_f)){
    alert('El numero de factura no es Valido');
    return false;
  }
  if(nombre_c== ''){
    alert('El campo de nombre es Obligatorio');
    return false;
  }else if(! validarNombreCompleto(nombre_c)){
    alert('El nombre no es Valido');
    return false;
  }
  if(documento_c== ''){
    alert('El campo de documento es Obligatorio');
    return false;
  }else if(! validarNumeroDocumento(documento_c)){
    alert('El documento no es Valido');
    return false;
  }
  if(telefono_c== ''){
    alert('El campo de telefono es Obligatorio');
    return false;
  }else if(! validarTelefono(telefono_c)){
    alert('El telefono no es Valido');
    return false;
  }
  if(nombre_produc== ''){
    alert('El campo de nombre producto es Obligatorio');
    return false;
  }else if(! validarNombreCompleto(nombre_produc)){
    alert('El nombre del producto no es Valido');
    return false;
  }
  if(cantidad== ''){
    alert('El campo de cantidad es Obligatorio');
    return false;
  }else if(! validarNumeroEntero(cantidad)){
    alert('La cantidad no es Valida');
    return false;
  }
  if(precio== ''){
    alert('El campo de precio es Obligatorio');
    return false;
  }else if(! validarNumeroDecimal(precio)){
    alert('El precio no es Valida');
    return false;
  }


  const data = `guardar=true&numero_factura=${number_f}&nombre_c=${nombre_c}&documento_c=${documento_c}&telefono_c=${telefono_c}&nombre_produc=${nombre_produc}&cantidad=${cantidad}&precio=${precio}&total=${total}&nombre_creador=${nombre_creador}`;

  const url = `../facturas/guardar_factura.php`;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader(
    "content-type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );
  xhr.send(data);
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      const resp = JSON.parse(xhr.responseText);
      // const resp = xhr.responseText;
      // console.log(resp);
      // cargarTabla();
      
      if (resp.estado) {
        cargar_factura("#carga_facturas");
        btn_generar.disabled = true;
        elements.forEach((element) => {
          element.setAttribute("disabled", "");
        });
        // alertify.success('Factura guardada exitosamente.');
      } else {
        alert(resp.mensaje);
        // alertify.error(resp.mensaje);
      }
    }
  };
}


// const editar = d.querySelector(btn_editar);
// const guardar = d.querySelector(btn_guardar);
// const num_f = d.getElementById('numero_factura').value;
// d.addEventListener("click", (e) => {
// if (e.target.matches(btn_editar)) {
// console.log('Editando la factura');
// const elements = d.querySelectorAll(".v_factura [disabled]");
// console.log(elements);
// elements.forEach((element) => {
//   element.removeAttribute("disabled");
// });
// }
// else if (e.target.matches(btn_guardar) && !num_f.disabled) {
//   const number_f = d.getElementById('numero_factura').value;
//   const nombre_c = d.getElementById('nombre_c').value;
//   const documento_c = d.getElementById('documento_c').value;
//   const telefono_c = d.getElementById('telefono_c').value;
//   const nombre_produc = d.getElementById('nombre_produc').value;
//   const cantidad = d.getElementById('cantidad').value;
//   const precio = d.getElementById('precio').value;
//   const total = d.getElementById('total').value;
//   const nombre_creador = d.getElementById('nombre_creador').value;

//   const elements = document.querySelectorAll("[data-habilitar]");
//   elements.forEach((element) => {
//     element.setAttribute("disabled", "");
//   });
//   console.log(telefono);

//   const data = `guardar=true&documento_usuario=${documento_usuario}&nombre_user=${user}&documento=${documento}&nombre=${nombre}&contrasena=${contrasena}&correo=${correo}&telefono=${telefono}&rol=${role_id}`;
//   const url = "../facturas/editar_facturas.php";

//   const xhr = new XMLHttpRequest();
//   xhr.open("POST", url, true);
//   xhr.setRequestHeader(
//     "content-type",
//     "application/x-www-form-urlencoded; charset=UTF-8"
//   );
//   xhr.send(data);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState == 4) {
//       const resp = JSON.parse(xhr.responseText);
//       // const resp = (xhr.responseText);
//       // console.log(resp);
//       //TABLA USUARIOS
//       // console.log('hola');
//       if (resp.estado) {
//         cargar_usuarios("#tabla");
//         guardar.disabled = true;

//         alert("DATOS GUARDADOS CORRECTAMENTE");
//       } else {
//         alert("Error al actualizar los datos");
//       }
//     }
//   };
// }
// });

// function editar(numero_f_editar) {
//   console.log('-------------------------');
// }



function imprimir_factura(num) {
  // window.open("../facturas/factura_pdf.php", "_blank", "width=800,height=600");
  // location.href = "../facturas/factura_pdf.php";
  window.open("../facturas/factura_pdf.php?num=" + num, "_blank", "width=800,height=600");

  // const numero_factura = num;
  // const pdf = querySelector('#pdf')
  // // const $vista_factura = d.querySelector("#vista_factura");
  // // const btn_editar = d.querySelector("#editar");
  
  // const url = `../facturas/vista_factura_pdf.php?num=${numero_factura}`;
  // const xhr = new XMLHttpRequest();
  // xhr.open("GET", url, true);
  // xhr.send();

  // xhr.onreadystatechange = () => {
  //   if (xhr.readyState == 4) {
  //   const resp = xhr.responseText;
  //     console.log(resp);
  //     console.log(pdf);
      

  // }
    
  // };
}

// btn_modulos("#btn-perfil", "#btn-usuarios");
