import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule,MatButtonModule,MatMenuModule,NgIf],
  templateUrl: './toolbar.component.html',
  styles: `.example-spacer {
    flex: 1 1 auto;
  }`
})
export class ToolbarComponent {
  have_permission:boolean = false;
  constructor(private router: Router,public dialog: MatDialog){
    
  }
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
      verifierPermissionsUtilisateur() {
        // Check if the code is running in a browser environment and localStorage is available
        /* if (typeof localStorage !== 'undefined') {
            const userS = localStorage.getItem('user');
            if (userS !== null) {
                const userData = JSON.parse(userS);
                return userData.is_superuser ? true : false;
            }
        } */
        // If not in a browser environment or localStorage is not available
        /*  */
    }
    
  ajoutLivre(){
    const userS = localStorage.getItem('user');
            if (userS !== null) {
                const userData = JSON.parse(userS);
                if (userData.is_superuser){
                this.router.navigate(['add/livre']);}
                else{
                    this.openDialog()
                }
  }
}
openDialog(): void {
  const dialogRef = this.dialog.open(MyDialogComponent, {
    data: {},
  });

  dialogRef.afterClosed().subscribe(() => {
    console.log('The dialog was closed');
  });
}
  profileEdit(){
    this.router.navigate(['profile'])
  }
  listLivre(){
    this.router.navigate(['livres'])
  }
  editerUsers(){
    const userS = localStorage.getItem('user');
            if (userS !== null) {
                const userData = JSON.parse(userS);
                if (userData.is_superuser){
                this.router.navigate(['users']);}
                else{
                    this.openDialog()
                }
  }
  }
  logout(){
    
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('user')
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }
}
