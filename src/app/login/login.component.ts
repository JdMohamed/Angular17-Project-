import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

export interface User{
  email:string,
  password:string
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule,MatFormFieldModule,MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  userForm:FormGroup;
  errorMessage = "";
  hide = true;

  ngOnInit(): void {
  this.userForm = new FormGroup({
    email: new FormControl('',[Validators.required]), // Initialiser les valeurs du formulaire
    password: new FormControl([],[Validators.required]),
  });
}

constructor(private auth: AuthService,
            private router: Router){

}

OnSubmit(){
  const user: User = {
    email: this.userForm.value.email,
    password: this.userForm.value.password,
  };
  console.log(user)
  this.auth.signIn(user)
  .subscribe(
    (res: any) => {
    console.log(res.myToken);
    localStorage.setItem('access_token', res.myToken);
    localStorage.setItem('user', JSON.stringify(res.user));
    this.router.navigate(['/livres']);
},
(error) => {                              //Error callback
  console.error("email or passwrod incorrect")
  this.errorMessage = "Incorrect Email or Password";}
)
}
addUser(){
  this.router.navigate(['/adduser']);

}
}
