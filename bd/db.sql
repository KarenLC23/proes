create  DATABASE IF NOT EXISTS proyecProes;


create table Roles(
    id int not null primary key auto_increment,
    nombre varchar(50) not null,
    descripcion varchar(150),
    creado_en timestamp,
    actualizado_en timestamp 
);

create table Usuarios(
    id int not null primary key auto_increment,
    nombre_user varchar(50) not null unique,
    nombre_completo varchar(150) not null,
    contrasena varchar (50) not null,
    correo varchar(150) unique,
    telefono varchar (50),
    creado_en timestamp,
    actualizado_en timestamp
);


create table role_usuario(
    role_id int not null,
    CONSTRAINT fk_rolId foreign key (role_id) REFERENCES roles (id ),
    usuario_id int not null,
    CONSTRAINT fk_usuarioId foreign key (usuario_id) REFERENCES usuarios (id ),
    PRIMARY KEY (role_id, usuario_id)

);


create table Facturas(
    id int not null primary key auto_increment,
    nombre_cliente varchar(150) not null,
    telefono_cliente varchar (50),
    nombre_producto varchar(100) not null,
    cantidad double not null,
    total double not null,
    creda_por varchar(100) not null,
    creado_en timestamp,
    actualizado_en timestamp
);



CONSTRAINT fk_idTipo foreign key (idTipos) REFERENCES tipos (idTipos)

insert into ciudadanos values("123","Jorge","Velez", 31);