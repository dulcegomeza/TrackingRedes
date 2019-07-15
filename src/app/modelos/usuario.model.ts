

export class Usuario {
    constructor(
        public correo: string,
        public contrasena: string,
        public idusuario?: string,
        public nombre?: string,
        public idrol?: string,
        public activo?: string
    ) { }
}
