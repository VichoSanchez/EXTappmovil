import { DataBaseService } from '../services/data-base.service';
import { showAlertDUOC } from "../tools/message-routines";

export class Usuario {

  correo = '';
  password = '';
  nombre = '';
  apellido = '';
  preguntaSecreta = '';
  respuestaSecreta = '';
  sesionActiva = '';

  constructor() { }

  setUsuario(correo: string, password: string, nombre: string, apellido: string, preguntaSecreta: string,
    respuestaSecreta: string, sesionActiva: string)
  {
    this.correo = correo;
    this.password = password;
    this.nombre = nombre;
    this.apellido = apellido;
    this.preguntaSecreta = preguntaSecreta;
    this.respuestaSecreta = respuestaSecreta;
    this.sesionActiva = sesionActiva;
  }

  static getUsuario(correo: string, password: string, nombre: string, apellido: string, preguntaSecreta: string,
    respuestaSecreta: string, sesionActiva: string)
  {
    const usu = new Usuario();
    usu.setUsuario(correo, password, nombre, apellido, preguntaSecreta, respuestaSecreta, sesionActiva)
    return usu;
  }

  validarCampoRequerido(nombreCampo: string, valor: string) {
    if (valor.trim() === '') return `El campo "${nombreCampo}" debe tener un valor.`;
    return '';
  }

  public validarCorreo(correo: string): string {
    if (correo.trim() === '') return `El campo "correo" debe tener un valor.`;
    const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const lastCharacter = parseInt(correo.charAt(correo.length - 1), 10);
    if (patronCorreo.test(correo) || !isNaN(lastCharacter) || correo === 'admin@duocuc.cl') {
      return '';
    } else {
      return 'El correo ingresado no tiene un formato válido.';
    }
  }

  public validarPassword(password: string): string {
    if (this.password.trim() === '') {
      return 'Para entrar al sistema debe ingresar la contraseña.';
    }
    for(let i = 0; i < password.length; i++) {
      if ('0123456789'.indexOf(password.charAt(i)) === -1) {
        return 'La contraseña debe ser numérica.';
      }
    }
    if (password.length !== 4) {
      return 'La contraseña debe ser numérica de 4 dígitos.';
    }
    return '';
  }

  validarNombre(nombre: string): string {
    return this.validarCampoRequerido('nombre', nombre);
  }

  validarApellido(apellido: string): string {
    return this.validarCampoRequerido('apellido', apellido);
  }

  validarPreguntaSecreta(preguntaSecreta: string): string {
    return this.validarCampoRequerido('pregunta secreta', preguntaSecreta);
  }

  validarRespuestaSecreta(respuestaSecreta: string): string {
    return this.validarCampoRequerido('respuesta secreta', respuestaSecreta);
  }

  validarPropiedadesUsuario(correo: string, password: string, nombre: string, apellido: string
    , preguntaSecreta: string, respuestaSecreta: string): string {
    return this.validarCorreo(correo) 
      || this.validarPassword(password)
      || this.validarNombre(nombre)
      || this.validarApellido(apellido)
      || this.validarPreguntaSecreta(preguntaSecreta)
      || this.validarRespuestaSecreta(respuestaSecreta)
  }

}
  