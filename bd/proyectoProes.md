# Proyecto Proes

## Lista de entidades

### Roles (EC)
- rol_id **(PK)**
- nombre

### Usuarios (ED)
- usuario_id **(PK)**
- nombre
- correo **(UQ)**
- contrasena 
- telefono
- fecha_creacion
- rol_id **(FK)**

### Facturas (ED)
- factura_id **(PK)**
- descripción
- fecha_creacion


## Relaciones

1. Un **Usuario** _tiene_ **un Rol** (_1 a M_)

## Reglas de Negocio:
Cada una de las entidades debe de realizar los siguientes items:
- Ingresar
- Leer
- Actualizar
- Eliminar


