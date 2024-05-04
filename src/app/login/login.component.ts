import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


export interface User{
  email:string,
  password:string
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  userForm:FormGroup;


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
  this.auth.signIn(user);

}
}

