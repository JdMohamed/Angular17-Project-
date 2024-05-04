import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { ToolbarComponent } from "./toolbar/toolbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
  
    <app-toolbar />

    <router-outlet />
  `,
    styleUrl: 'app.component.css',
    imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, ToolbarComponent]
})
export class AppComponent {


  /* constructor(private router: Router){}
  isSuperUSer():boolean{
    const userS=localStorage.getItem('user')
    if ( userS!== null) {
      const userData=JSON.parse(userS)
        if(userData.is_superuser){
           return false
          }else{
          return true
        }}
      return false
      }
    
  
  ajoutLivre(){
    this.router.navigate(['add/livre'])
  }
  listLivre(){
    this.router.navigate(['livres'])
  }
  logout(){
    
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  } */
}

