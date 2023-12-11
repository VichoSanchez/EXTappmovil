import { Component,ElementRef,ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { ApiClientService } from 'src/app/services/api-client.service';
import { AnimationController, IonicModule } from '@ionic/angular';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
  QrComponent, MiclaseComponent, ForoComponent, MisdatosComponent,AdminComponent]
})
export class InicioPage implements OnInit {
  usuario = new Usuario();
  @ViewChild('titulo', { read: ElementRef, static: true}) titulo!: ElementRef;
  componente_actual = 'qr';

  constructor(
    private authService: AuthService, 
    private bd: DataBaseService,
    private api: ApiClientService,
    private animationController:AnimationController) { }

    ngOnInit() {
      this.authService.usuarioAutenticado.subscribe((usuario) => {
        if (usuario !== null) {
          this.usuario = usuario!;
          
        }
      })
      
      
    }

  cambiarComponente(nombreComponente: string) {
    this.componente_actual = nombreComponente;
    if (nombreComponente === 'foro') this.api.cargarPublicaciones();
    if (nombreComponente === 'misdatos') this.authService.leerUsuarioAutenticado();

  }

  cerrarSesion() {
    this.authService.logout();
  }
  public ngAfterViewInit(): void {
    const animation = this.animationController
      .create()
      .addElement(this.titulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(-50%)', 'translate(100%)')
      .fromTo('opacity', 0.2, 1);
    animation.play();
  }
}
