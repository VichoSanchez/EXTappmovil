import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, NavController } from '@ionic/angular';

import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';

import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';
import { ActivatedRoute,Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RegistroPage implements OnInit {

   usuario = new Usuario();
   repeticionPassword = '';

  constructor(private authService: AuthService,private router: Router, private bd: DataBaseService) { }

  async ngOnInit() {
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario !== null) {
        this.usuario = usuario!;
        this.repeticionPassword = usuario!.password;
      }
    })
  }

   mostrarMensaje(nombreCampo:string, valor: string) {
     if (valor.trim() === '') {
       showAlertDUOC(`Debe ingresar un valor para el campo "${nombreCampo}".`);
       return false;
     }
     return true;
   }

   async nuevoUsuario() {
     if (!this.mostrarMensaje('nombre', this.usuario.nombre)) return;
     if (!this.mostrarMensaje('apellidos', this.usuario.apellido)) return;
     if (!this.mostrarMensaje('correo', this.usuario.correo)) return;
     if (!this.mostrarMensaje('pregunta secreta', this.usuario.preguntaSecreta)) return;
     if (!this.mostrarMensaje('respuesta secreta', this.usuario.respuestaSecreta)) return;
     if (!this.mostrarMensaje('contraseña', this.usuario.password)) return;
     if (this.usuario.password !== this.repeticionPassword) {
       showAlertDUOC(`Las contraseñas escritas deben ser iguales.`);
       return;
     }
     await this.bd.guardarUsuario(this.usuario);
     showToast('El Usuario fue registrado');
   }

  public volverLogin(): void {
    this.router.navigate(['/ingreso']);
  }

}
