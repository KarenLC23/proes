

  //Nombre Usuario
  export function validarNombreUsuario(nombreUsuario) {
    // Expresión regular que busca caracteres que no sean letras ni números
    const regex = /[^a-zA-Z0-9]/g;
    // Si el nombre de usuario tiene algún carácter no permitido, retorna falso
    if (regex.test(nombreUsuario)) {
      return false;
    }
    // Si el nombre de usuario está vacío, retorna falso
    if (nombreUsuario.trim() === '') {
      return false;
    }
    // Si llega hasta aquí, el nombre de usuario es válido
    return true;
  }


  //Documento
  export function validarNumeroDocumento(numDocumento) {
    if (!/^[0-9]{8,}$/.test(numDocumento)) {
      return false;
    }
    return true;
  }

  //Nombre completo
  export function validarNombreCompleto(nombreCompleto) {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(nombreCompleto);
  }

  //Contraseña
  export function validarContrasena(contrasena) {
    if (/\s/.test(contrasena)) {
      // Si la contraseña contiene espacios, retorna false
      return false;
    }
    // Si no contiene espacios, retorna true
    return true;
  }

      //Correo
    export  function validarCorreo(correo) {
    // Expresión regular para validar el correo electrónico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!regexCorreo.test(correo)) {
      return false;
    }
    
    return true;
  }


  //Telefono
  export function validarTelefono(telefono) {
    if (!/^[0-9]{6,}$/.test(telefono)) {
      return false;
    }
    return true;
  }

//Numero Factura.

export function validarNumeroFactura(numeroFactura) {
  // Eliminamos los espacios en blanco del inicio y final del número
  numeroFactura = numeroFactura.trim();

  // Validamos que el número de factura sea mayor o igual a 4 dígitos
  if (numeroFactura.length >= 4 && !isNaN(numeroFactura)) {
    return true;
  } else {
    return false;
  }
}


//Numeros
export function validarNumeroEntero(num) {
  const valor = num.trim();
  const regex = /^[1-9]\d*$/; // Expresión regular para validar números enteros mayores a cero
  
  if (regex.test(valor)) {
    // El valor es un número entero mayor a cero
    // input.classList.remove("is-invalid");
    // input.classList.add("is-valid");
    return true;
  } else {
    // El valor no es un número entero mayor a cero
   
    return false;
  }
}


//Numeros decimales
export function validarNumeroDecimal(valor) {
  // Se convierte a número
  const numero = Number(valor);

  // Se valida que sea un número mayor a cero y que no sea NaN
  if (numero > 0 && !isNaN(numero)) {
    // Se valida que no tenga más de dos decimales
    const decimal = valor.toString().split('.');
    if (decimal[1] && decimal[1].length > 2) {
      return false;
    }

    return true;
  }

  return false;
}