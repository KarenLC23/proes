const d = document;

import btn_modulos from "./script.js";
import {
  validarNombreUsuario,
  validarNumeroDocumento,
  validarNombreCompleto,
  validarCorreo,
  validarTelefono,
  validarContrasena,
} from "./validaciones.js";

cargar_usuarios("#tabla");

// Agregamos el listener para el botón "Crear" fuera del listener para cada fila de la tabla
d.addEventListener("click", (e) => {
  if (e.target.matches("#crear")) {
    // Quitamos la clase "seleccionado" de todas las filas
    const filas = d.querySelectorAll("#tabla tbody tr");
    filas.forEach((fila) => {
      fila.classList.remove("seleccionado");
    });
  }
});

function cargar_usuarios(tabla_users) {
  const tabla = d.querySelector(tabla_users);
  const url = "../usuarios/tabla_usuarios.php";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      tabla.innerHTML = xhr.responseText;

      const filas = d.querySelectorAll(`${tabla_users} tbody tr`);
      filas.forEach((fila) => {
        fila.addEventListener("click", (e) => {
          const documento =
            e.target.parentNode.querySelector("td:nth-child(1)").textContent;
          ver_usuario(documento);
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

      //Search
      const inputBusqueda = d.querySelector("#search-input");
      inputBusqueda.addEventListener("input", () => {
        const valorBusqueda = inputBusqueda.value.trim().toLowerCase();
        filas.forEach((fila) => {
          const documento = fila.querySelector("td:nth-child(1)").textContent;
          const nombreUsuario = fila
            .querySelector("td:nth-child(2)")
            .textContent.toLowerCase();

          if (
            documento.includes(valorBusqueda) ||
            nombreUsuario.includes(valorBusqueda)
          ) {
            fila.classList.remove("oculto");
          } else {
            fila.classList.add("oculto");
          }
        });
      });
    }
  };
}

function ver_usuario(doc) {
  // console.log(doc);

  const documento_usuario = doc;
  const $perfil_usuario = d.getElementById("ver_usuario");

  const url = `../usuarios/ver_usuario.php?doc=${documento_usuario}`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      // const respo = xhr.responseText;
      // console.log(respo);
      $perfil_usuario.innerHTML = xhr.responseText;

      editar("#editar_user", "#guardar_user", documento_usuario);
      eliminar_usuario("#eliminar_user", documento_usuario, "#ver_usuario");
    }
  };
}

function editar(btn_editar, btn_guardar, documento_usuario) {
  const editar = d.querySelector(btn_editar);
  const guardar = d.querySelector(btn_guardar);
  const nom = d.querySelector("#n");
  d.addEventListener("click", (e) => {
    if (e.target.matches(btn_editar)) {
      const elements = document.querySelectorAll("[disabled]");
      elements.forEach((element) => {
        element.removeAttribute("disabled");
      });
    } else if (e.target.matches(btn_guardar) && !nom.disabled) {
      const user = d.querySelector("#user").value;
      const documento = d.querySelector("#d").value;
      const nombre = d.querySelector("#n").value;
      // const contrasena = d.querySelector("#contrasena").value;
      const correo = d.querySelector("#correo").value;
      const telefono = d.querySelector("#telefono").value;
      const role_id = d.querySelector("#roles").value;

      //Nombre User
      if (user === "") {
        alert("El campo nombre de usuario es obligatorio");
        return false;
      } else if (!validarNombreUsuario(user)) {
        alert(
          "El nombre de usuario debe ir sin espacios y sin caractares especiales"
        );
        return false;
      }

      //Numero Documento
      if (documento === "") {
        alert("El campo documento es Obligatorio")
        return false;
      } else if (!validarNumeroDocumento(documento)) {
        alert("El numero de documento no es valido");
        return false;
      }

      //Nombre Completo
      if (nombre === "") {
        alert("El campo nombre completo es obligatorio");
        return false;
      } else if (!validarNombreCompleto(nombre)) {
        alert("El el nombre no es valido");
        return false;
      }

      //Correo
      if (correo === "") {
        alert("El campo correo es obligatorio");
        return false;
      } else if (!validarCorreo(correo)) {
        alert("El correo es invalido");
        return false;
      }

      //Telefono
      if (telefono === "") {
        alert("El campo Teléfono es obligatorio");
        return false;
      } else if (!validarTelefono(telefono)) {
        alert("El telefono No es Valido");
        return false;
      }

      //Roles
      if (role_id === "") {
        alert("Seleccione un ROOL");
        return false;
      }

      const data = `guardar=true&documento_usuario=${documento_usuario}&nombre_user=${user}&documento=${documento}&nombre=${nombre}&correo=${correo}&telefono=${telefono}&rol=${role_id}`;
      const url = "../usuarios/editar_usuario.php";

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
          //TABLA USUARIOS
          if (resp.estado) {
            cargar_usuarios("#tabla");
            guardar.disabled = true;
            const elements = document.querySelectorAll("[data-habilitar]");
            elements.forEach((element) => {
              element.setAttribute("disabled", "");
            });
            alert("DATOS GUARDADOS CORRECTAMENTE----------");
          } else {
            alert(resp.mensaje);
          }
        }
      };
    }
  });
}

// function eliminar_usuario(btn_eliminar, documento_eliminar, ver) {
//   const eliminar = d.querySelector(btn_eliminar);
//   const $desabilitar_input = d.querySelector(ver);
//   d.addEventListener("click", (e) => {
//     if (e.target.matches(btn_eliminar)) {
//       const data = `eliminar=true&documento=${documento_eliminar}`;
//       const url = `../usuarios/eliminar_usuario.php`;

//       const xhr = new XMLHttpRequest();
//       xhr.open("POST", url, true);
//       xhr.setRequestHeader(
//         "content-type",
//         "application/x-www-form-urlencoded; charset=UTF-8"
//       );
//       xhr.send(data);
//       xhr.onreadystatechange = () => {
//         if (xhr.readyState == 4) {
//           const resp = JSON.parse(xhr.responseText);
//           // const resp = (xhr.responseText);
//           // console.log(resp);

//           if (resp.estado) {
//             // btn_g.disabled = true;
//             cargar_usuarios("#tabla");
//             $desabilitar_input.innerHTML = "";
//             alert("Usuario eliminado exitosamente.");
//           } else {
//             alert("Error al eliminar el usuario.");
//           }
//         }
//       };
//     }
//   });
// }

function eliminar_usuario(btn_eliminar, documento_eliminar, ver) {
  const eliminar = d.querySelector(btn_eliminar);
  const $desabilitar_input = d.querySelector(ver);

  eliminar.addEventListener("click", () => {
    const confirmacion = confirm("¿Desea eliminar el usuario seleccionado?");
    if (confirmacion) {
      const data = `eliminar=true&documento=${documento_eliminar}`;
      const url = `../usuarios/eliminar_usuario.php`;

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
          if (resp.estado) {
            $desabilitar_input.innerHTML = "";
            alert("Usuario eliminado correctamente");
            cargar_usuarios("#tabla");

            const fila_seleccionada = d.querySelector(".seleccionado");
            // const tabla = d.querySelector("#tabla");
            // if (tabla.contains(fila_seleccionada)) {
            //   // tabla.removeChild(fila_seleccionada);
            // }
            fila_seleccionada.removeEventListener("click", () => {});
          } else {
            alert("Error al eliminar el usuario");
          }
        }
      };
    }
  });
}

d.addEventListener("click", (e) => {
  if (e.target.matches("#n_guardar")) {
    adicionar_usuario("#n_guardar");
  } else if (e.target.matches("#crear")) {
    crear_usuario("#crear");
  }
});

function crear_usuario() {
  // d.addEventListener("click", (e) => {
  //   if (e.target.matches(crear_user)) {
  const $nuevos_datos = d.getElementById("ver_usuario");

  const url = `../usuarios/nuevo_usuario.php`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      const respo = xhr.responseText;
      // console.log(respo);
      // $nuevos_datos.innerHTML = '';
      $nuevos_datos.innerHTML = xhr.responseText;

      // adicionar_usuario("#n_guardar");
    }
  };
  //   }
  // });
}

function adicionar_usuario(btn_guardar_nuevo) {
  // let $nuevos_datos = d.getElementById("ver_usuario");

  const input_documento = d.getElementById("n_documento");
  const input_nombre_usuario = d.getElementById("n_user");
  const input_nombre = d.getElementById("n_nombre");
  const input_contrasena = d.getElementById("n_contrasena");
  const input_correo = d.getElementById("n_correo");
  const input_telefono = d.getElementById("n_telefono");
  const selec_rol = d.getElementById("n_rol");
  // d.addEventListener("click", (e) => {
  //   // console.log(e.target);
  //   if (e.target.matches(btn_guardar_nuevo)) {

  const btn_g = d.querySelector(btn_guardar_nuevo);

  const nuevo_doc = input_documento.value;
  const nuevo_nom_user = input_nombre_usuario.value;
  const nuevo_nombre = input_nombre.value;
  const nuevo_contra = input_contrasena.value;
  const nuevo_correo = input_correo.value;
  const nuevo_tel = input_telefono.value;
  const nuevo_rol = selec_rol.value;

  //Nombre User
  if (nuevo_nom_user === "") {
    alert("El campo nombre de usuario es obligatorio");
    return false;
  } else if (!validarNombreUsuario(nuevo_nom_user)) {
    alert(
      "El nombre de usuario debe ir sin espacios y sin caractares especiales"
    );
    return false;
  }

  //Numero Documento
  if (nuevo_doc === "") {
    alert("El campo documento es obligatorio");
    return false;
  } else if (!validarNumeroDocumento(nuevo_doc)) {
    alert("El numero de documento no es valido");
    return false;
  }

  //Nombre Completo
  if (nuevo_nombre === "") {
    alert("El campo nombre completo es obligatorio");
    return false;
  } else if (!validarNombreCompleto(nuevo_nombre)) {
    alert("El el nombre no es valido");
    return false;
  }

  //Contraseña
  if (nuevo_contra === "") {
    alert("El campo contraseña es obligatorio");
    return false;
  } else if (!validarContrasena(nuevo_contra)) {
    alert("La contraseña no es valida, no debe de tener espacios");
    return false;
  }

  //Correo
  if (nuevo_correo === "") {
    alert("El campo correo es obligatorio");
    return false;
  } else if (!validarCorreo(nuevo_correo)) {
    alert("El correo es invalido");
    return false;
  }

  //Telefono
  if (nuevo_tel === "" ) {
    alert("El campo Teléfono es obligatorio");
    return false;
  } else if (!validarTelefono(nuevo_tel)) {
    alert("El telefono No es Valido");
    return false;
  }

  //Roles
  if (nuevo_rol === "") {
    alert("Seleccione un ROOL");
    return false;
  }

  const data = `guardar=true&documento=${nuevo_doc}&nombre_user=${nuevo_nom_user}&nombre_completo=${nuevo_nombre}&contrasena=${nuevo_contra}&correo=${nuevo_correo}&telefono=${nuevo_tel}&rol=${nuevo_rol}`;
  const url = `../usuarios/guardar_nuevo_user.php`;

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
      // const resp = xhr.responseText;
      // console.log(resp.mensaje);

      if (resp.estado) {
        cargar_usuarios("#tabla");
        btn_g.disabled = true;
        input_documento.disabled = true;
        input_nombre_usuario.disabled = true;
        input_nombre.disabled = true;
        input_contrasena.disabled = true;
        input_correo.disabled = true;
        input_telefono.disabled = true;
        selec_rol.disabled = true;
        alert("Usuario guardado exitosamente.");
      } else {
        alert(resp.mensaje);
      }
    }
  };
  //   }
  // });
}

// crear_usuario("#crear");

btn_modulos("#btn-perfil", "#btn-usuarios");
