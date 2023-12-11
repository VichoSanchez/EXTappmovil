import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorrectoPage implements OnInit {

  public password:String;

  constructor(private activatedRoute: ActivatedRoute,private router: Router) {

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.password = this.router.getCurrentNavigation().extras.state.password;
    }
    });
   }

  ngOnInit() {
  }
  public volverInicio():void{
    this.router.navigate(['/ingreso'])
  }
}
