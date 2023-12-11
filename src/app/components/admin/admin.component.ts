import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonCardHeader,IonCard, IonButton } from '@ionic/angular/standalone';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone:true,
  imports:[IonCard,IonCardHeader,IonButton,NgFor,NgIf]
})
export class AdminComponent  implements OnInit {

  usuarios2:any;

  constructor(private db:DataBaseService) { 

    this.db.listaUsuarios.subscribe((usuarios)=>{
      usuarios.reverse();
      this.usuarios2=usuarios;
    })
  }

  async eliminarUsuario(user:any){
    
    try {
      await this.db.eliminarUsuarioUsandoCorreo(user.correo);
    } catch (error) {
      console.log("algo salío mal");
    }
    
  }

  ngOnInit() {}

}
