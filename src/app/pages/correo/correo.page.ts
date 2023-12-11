import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Usuario } from 'src/app/model/usuario';
@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage implements OnInit {

  public correo: string = '';

  constructor(private router: Router,private toastController: ToastController,private db:DataBaseService) { }

  ngOnInit() {
  }

  public async  ingresarPaginaValidarRespuestaSecreta(): Promise<void> {
    
    const usuarioEncontrado = await this.db.leerUsuario(this.correo);
    // esta función devuelve un usuario o nulo, si es nulo cumplira el if y redirigira a incorrecto
    
    if (!usuarioEncontrado) {
      console.log(usuarioEncontrado);

      this.router.navigate(['/incorrecto'])
    }
    else {
      console.log(usuarioEncontrado);
      
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioEncontrado
        }
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    }
  }

  public volverInicio():void{
    this.router.navigate(['/ingreso'])
  }

}
