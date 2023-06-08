const d = document;

import btn_modulos from "./script.js";
import { validarNombreUsuario, validarNumeroDocumento,  validarNombreCompleto, validarCorreo, validarTelefono , validarContrasena} from './validaciones.js';

function ver_perfil(perfil_user) {
  const $perfil_user = d.getElementById(perfil_user);

  const url = "../perfil/perfil.php";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      const respo = xhr.responseText;
      $perfil_user.innerHTML = xhr.responseText;
      editar_perfil("#editar", "#guardar");
    }
  };
}

export default function editar_perfil(btn_editar, btn_guardar) {
  const editar = d.querySelector(btn_editar);
  const guardar = d.querySelector(btn_guardar);
  const nom = d.querySelector("#nombre");

  d.addEventListener("click", (e) => {
    if (e.target.matches(btn_editar)) {
      // console.log(editar);
      const elements = document.querySelectorAll("[disabled]");
      elements.forEach((element) => {
        element.removeAttribute("disabled");
      });
    }
    if (e.target.matches(btn_guardar) && !nom.disabled) {
      //Datos del Usuario
      const user = d.querySelector("#user").value;
      const documento = d.querySelector("#documento").value;
      const nombre = d.querySelector("#nombre").value;
      const contrasena = d.querySelector("#contrasena").value;
      const correo = d.querySelector("#correo").value;
      const telefono = d.querySelector("#telefono").value;
      const rol = d.querySelector("#roles_seccion").value;

      //Nombre User
      if (user === "" || !validarNombreUsuario(user)) {
        if (user === "") {
          alert("El campo nombre de usuario es obligatorio");
        } else {
          alert(
            "El nombre de usuario debe ir sin espacios y sin caractares especiales"
          );
        }
        return false;
      }

      //Numero Documento
      else if (documento === "" || !validarNumeroDocumento(documento)) {
        if (documento === "") {
          alert("El campo documento es obligatorio");
        } else {
          alert("El numero de documento no es valido");
        }
        return false;
      }

      //Nombre Completo
      else if (nombre === "" || !validarNombreCompleto(nombre)) {
        if (nombre === "") {
          alert("El campo nombre completo es obligatorio");
        } else {
          alert("El el nombre no es valido");
        }
        return false;
      }

      //Contraseña
      else if (contrasena === "" || !validarContrasena(contrasena)) {
        if (contrasena === "") {
          alert("El campo contraseña es obligatorio");
        } else {
          alert("La contraseña no es valida, no debe de tener espacios");
        }
        return false;
      }

      //Correo
      else if (correo === "" || !validarCorreo(correo)) {
        if (correo === "") {
          alert("El campo correo es obligatorio");
        } else {
          alert("El correo es invalido");
        }
        return false;
      }

      //Telefono
      else if (telefono === "" || !validarTelefono(telefono)) {
        if (telefono === "") {
          alert("El campo Teléfono es obligatorio");
        } else {
          alert("El telefono No es Valido");
        }
        return false;
      }

      //Roles
      else if (rol === "") {
        alert("Seleccione un ROOL");
        return false;
      }


      // console.log('---------');
      const data = `guardar=true&nombre_user=${user}&documento=${documento}&nombre_completo=${nombre}&contrasena=${contrasena}&correo=${correo}&telefono=${telefono}&rol=${rol}`;
      // console.log(data);
      const url = "../perfil/actualizar_datos.php";

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

          if (resp.estado) {
            const elements = document.querySelectorAll("[data-habilitar]");
            elements.forEach((element) => {
              element.setAttribute("disabled", "");
            });
            ver_perfil("perfil_user");
            alert("DATOS GUARDADOS CORRECTAMENTE");
            //   console.log(resp.estado);
            //   modulos();
            //   xhr.abort();
          } else {
            alert(resp.mensaje);

            //SI NO HAY NINGUN ERROR. SI LOS DATOS SON UNICOS, USER, CORREO, CONTRASEÑA ENCRIPTADA ETC.
          }
        }
      };
    }
  });
}

btn_modulos("#btn-perfil", "#btn-usuarios");
ver_perfil("perfil_user");
