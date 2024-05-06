import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LivreService } from '../livre.service';
export interface newUser{
  name:string;
  email:string;
  password:string;
  is_superuser:Boolean
}
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,ReactiveFormsModule, MatInputModule, CommonModule, MatSelectModule,  MatFormFieldModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit{
  livreForm:FormGroup;
  hide = true;
  constructor(private livreservice: LivreService,
    private router: Router){}
 
  ngOnInit(): void {
    this.livreForm = new FormGroup({
      name: new FormControl('',[Validators.required]), // Initialiser les valeurs du formulaire
      email: new FormControl([],[Validators.required]),
      password: new FormControl([],[Validators.required])
    });
  }
  OnSubmit(){
    const user: newUser = {
      name: this.livreForm.value.name,
      email: this.livreForm.value.email,
      password:this.livreForm.value.password,
      is_superuser:false
    };
    console.log(user)
    this.livreservice.addUser(user).subscribe(()=>
      this.router.navigate(['/login']));

  }

}