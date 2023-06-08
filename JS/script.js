const d = document;

function iniciar_seccion(bt_iniciar, n_usuario, contrasena) {
  //const $bt_iniciar = d.querySelector(bt_iniciar);
  const $n_usuario = d.querySelector(n_usuario);
  const $contrasena = d.querySelector(contrasena);

  d.addEventListener("click", (e) => {
    if (e.target.matches(bt_iniciar)) {
      if ($n_usuario.value == "" && $contrasena.value == "") {
        alert("Escriba los datos sugeridos");
      } else {
        const data = `validar=true&nombre_user=${$n_usuario.value}&contrasena=${$contrasena.value}`;
        const url = "iniciar_seccion.php";

        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader(
          "content-type",
          "application/x-www-form-urlencoded; charset=UTF-8"
        );
        xhr.send(data);
        xhr.onreadystatechange = () => {
          if (xhr.readyState == 4) {
            // const resp = (xhr.responseText);
            // console.log(resp);
            const resp = JSON.parse(xhr.responseText);
            if (resp.estado) {
              console.log(resp.estado);
              modulos();
              xhr.abort();
            } else {
              alert(resp.mensaje);
            }
          }
        };
      }
    }
  });
}

iniciar_seccion("#iniciar", "#nombre-usuario", "#contrasena");


function modulos() {
  location.href = "modulos/modulos.php";
  // perfil("#btn-perfil");
}





//BOTONES DE NAVEGACION
export default function btn_modulos(btn_perfil, btn_usuarios, btn_facturas) {
  // const $btn_perfil = d.querySelector(btn_perfil);
  
  d.addEventListener("click", (e) => {
    // console.log(e.target);
    if (e.target.matches(btn_perfil)) {
      location.href = "../perfil/perfil2.php";
      
    } 
    else if(e.target.matches(btn_usuarios)) {
      location.href = "../usuarios/usuarios.php";
    }
    else if(e.target.matches(btn_facturas)){
      location.href = "../facturas/facturas.php";
    }
  });
}



btn_modulos("#btn-perfil", '#btn-usuarios', '#btn-facturas');
document.addEventListener("DOMContentLoaded", function () {});

function ocultar_botones() {
  
}


function ver_usuarios(btn_usuarios){
  
}


// cargar_usuarios();

// function cargar_usuarios() {
//   const tabla = document.getElementById("tabla");
//   console.log("Holaaaaaaaaa");
//   console.log(tabla);
//   d.addEventListener("click", (e) => {
//     if (e.target.matches("#btn-usuarios")) {

//       const url = "../usuarios/tabla_usuarios.php";

//       const xhr = new XMLHttpRequest();
//       xhr.open("GET", url, true);
//       xhr.send();
//       xhr.onreadystatechange = () => {
//         if (xhr.readyState == 4) {
//           const y = xhr.responseText;

//           location.href = "../usuarios/usuarios.php";
//           // tabla.innerHTML = xhr.responseText;

//           // d.addEventListener("click", (e) => {
//           //   // const documento = e.target.value;
//           //   console.log(documento.value);
//           const filas = d.querySelectorAll("#tabla tbody tr");

//           filas.forEach((filas) => {
//             filas.addEventListener("click", (e) => {
//               const documento =
//                 e.target.parentNode.querySelector(
//                   "td:nth-child(1)"
//                 ).textContent;
//               ver_usuario(documento);
//               // console.log(documento);
//             });
//           });

//           // const filas = document.querySelectorAll('#tabla tbody tr');
//           //Seleccionar
//           filas.forEach((fila) => {
//             fila.addEventListener("click", () => {
//               // Quitamos la clase "seleccionado" de todas las filas
//               filas.forEach((fila) => {
//                 fila.classList.remove("seleccionado");
//               });

//               // Agregamos la clase "seleccionado" a la fila seleccionada

//               fila.classList.add("seleccionado");

//               d.addEventListener("click", (e) => {
//                 if (!e.target.matches(".selec")) {
//                   fila.classList.remove("seleccionado");
//                 }
//               });
//             });
//           });

//           // });
//         }
//       };
//     }
//   });
// }

// perfil("#btn-perfil", "#perfil");


// function editar_perfil(btn_editar, btn_guardar) {
//   const editar = d.querySelector("#editar");
//   const guardar = d.querySelector("#guardar");
//   const nom = d.querySelector("#nombre");

//   d.addEventListener("click", (e) => {
//     if (e.target.matches(btn_editar)) {
//       // console.log(editar);
//       const elements = document.querySelectorAll("[disabled]");
//       elements.forEach((element) => {
//         element.removeAttribute("disabled");
//       });
//     }
//     if (e.target.matches(btn_guardar) && !nom.disabled) {
//       //Datos del Usuario
//       const user = d.querySelector("#user").value;
//       const nombre = d.querySelector("#nombre").value;
//       const contrasena = d.querySelector("#contrasena").value;
//       const correo = d.querySelector("#correo").value;
//       const telefono = d.querySelector("#telefono").value;

//       const elements = document.querySelectorAll("[data-habilitar]");
//       elements.forEach((element) => {
//         element.setAttribute("disabled", "");
//       });

//       const data = `guardar=true&nombre_user=${user}&nombre_completo=${nombre}&contrasena=${contrasena}&correo=${correo}&telefono=${telefono}`;
//       // console.log(data);
//       const url = "../perfil/actualizar_datos.php";

//       const xhr = new XMLHttpRequest();
//       xhr.open("POST", url, true);
//       xhr.setRequestHeader(
//         "content-type",
//         "application/x-www-form-urlencoded; charset=UTF-8"
//       );
//       xhr.send(data);
//       xhr.onreadystatechange = () => {
//         if (xhr.readyState == 4) {
//           // const resp = JSON.parse(xhr.responseText);
//           const resp = JSON.parse(xhr.responseText);
//           if (resp.estado) {
//             alert("DATOS GUARDADOS CORRECTAMENTE");
//             //   console.log(resp.estado);
//             //   modulos();
//             //   xhr.abort();
//             // } else {
//             //   alert(resp.mensaje);
//             //SI NO HAY NINGUN ERROR. SI LOS DATOS SON UNICOS, USER, CORREO, CONTRASEÑA ENCRIPTADA ETC.
//           }
//         }
//       };
//     }
//   });
// }

// editar_perfil("#editar", "#guardar");

// document.addEventListener("DOMContentLoaded", function() {
//   cargar_usuarios();
// });

// function cargar_usuarios() {
//   const tabla = document.getElementById("ta");
//   console.log("Holaaaaaaaaa");
//   console.log(tabla);
//   d.addEventListener("click", (e) => {
//     if (e.target.matches("#btn-usuarios")) {

//       const url = "../usuarios/tabla_usuarios.php";

//       const xhr = new XMLHttpRequest();
//       xhr.open("GET", url, true);
//       xhr.send();
//       xhr.onreadystatechange = () => {
//         if (xhr.readyState == 4) {
//           const y = xhr.responseText;

//           location.href = "../usuarios/usuarios.php";
//           // tabla.innerHTML = xhr.responseText;

//           // d.addEventListener("click", (e) => {
//           //   // const documento = e.target.value;
//           //   console.log(documento.value);
//           const filas = d.querySelectorAll("#tabla tbody tr");

//           filas.forEach((filas) => {
//             filas.addEventListener("click", (e) => {
//               const documento =
//                 e.target.parentNode.querySelector(
//                   "td:nth-child(1)"
//                 ).textContent;
//               ver_usuario(documento);
//               // console.log(documento);
//             });
//           });

//           // const filas = document.querySelectorAll('#tabla tbody tr');
//           //Seleccionar
//           filas.forEach((fila) => {
//             fila.addEventListener("click", () => {
//               // Quitamos la clase "seleccionado" de todas las filas
//               filas.forEach((fila) => {
//                 fila.classList.remove("seleccionado");
//               });

//               // Agregamos la clase "seleccionado" a la fila seleccionada

//               fila.classList.add("seleccionado");

//               d.addEventListener("click", (e) => {
//                 if (!e.target.matches(".selec")) {
//                   fila.classList.remove("seleccionado");
//                 }
//               });
//             });
//           });

//           // });
//         }
//       };
//     }
//   });
// }

// function ver_usuario(documento) {
//   console.log(documento);
// }

// ver_usuarios();

// function cerrar_seccion() {
//   const user = d.querySelector("#btn-cerrar-seccion");
//   d.addEventListener("click", (e) => {
//     if (e.target.matches("#btn-cerrar-seccion")) {
//       // const url = "../perfil/actualizar_datos.php";
//       // const xhr = new XMLHttpRequest();
//       // xhr.open("POST", url, true);
//       // xhr.setRequestHeader(
//       //   "content-type",
//       //   "application/x-www-form-urlencoded; charset=UTF-8"
//       // );
//       // xhr.send();
//       // xhr.onreadystatechange = () => {
//       //   if (xhr.readyState == 4) {
//       //     // const resp = JSON.parse(xhr.responseText);
//       //     const resp = xhr.responseText;
//       //     console.log(resp);
//       //     if (resp.estado) {
//       //       //   console.log(resp.estado);
//       //       //   modulos();
//       //       //   xhr.abort();
//       //       // } else {
//       //       //   alert(resp.mensaje);
//       //       //SI NO HAY NINGUN ERROR. SI LOS DATOS SON UNICOS, USER, CORREO, CONTRASEÑA ENCRIPTADA ETC.
//       //     }
//       //   }
//       // };
//     }
//   });
// }

// cerrar_seccion();
