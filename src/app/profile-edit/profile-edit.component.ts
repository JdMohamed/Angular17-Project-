import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { Livre, auteur, categorie } from '../livre';
import { LivreService } from '../livre.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { UserP } from '../user';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatSelectModule, ReactiveFormsModule, MatInputModule, CommonModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: `./profile-edit.component.css`
})
export class ProfileEditComponent implements OnInit{

  livreForm :FormGroup;
  User:UserP
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth:AuthService){}

  ngOnInit(){
    this.livreForm = this.formBuilder.group({
      name: [''], // Initialiser les valeurs du formulaire
      email: [''],
    });
    const userS=localStorage.getItem('user')
  if ( userS!== null) {
    const userData=JSON.parse(userS)
    this.livreForm.patchValue({
      name: userData.name,
      email:userData.email
    });
  }
  }
  OnSubmit(){

  }

}
