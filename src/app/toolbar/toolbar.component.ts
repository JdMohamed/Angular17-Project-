import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule,MatButtonModule,MatMenuModule],
  templateUrl: './toolbar.component.html',
  styles: `.example-spacer {
    flex: 1 1 auto;
  }`
})
export class ToolbarComponent {
  constructor(private router: Router){}
 /*  isSuperUSer():boolean{
    const userS= localStorage.getItem('user');
    if ( userS!== null) {
      const userData=JSON.parse(userS)
        if(userData.is_superuser){
           return false
          }else{
          return true
        }}
      return false
      }
     */
  
  ajoutLivre(){
    this.router.navigate(['add/livre'])
  }
  profileEdit(){
    this.router.navigate(['profile'])
  }
  listLivre(){
    this.router.navigate(['livres'])
  }
  logout(){
    
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('user')
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }
}
