import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Livre, auteur, categorie } from '../livre';
import { LivreService } from '../livre.service';
import { Router } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
export interface livreEdited{
  titre:string;
  auteurs:[{
    nom:string;
  }];
  categories:[{
    nom:string;
  }];
  isbn:string;
  synopsis:string;
}
@Component({
  selector: 'app-add-livre',
  standalone: true,
  imports: [MatButtonModule,ReactiveFormsModule, MatInputModule, CommonModule, MatSelectModule,  MatFormFieldModule],
  templateUrl: './add-livre.component.html',
  styleUrl: './add-livre.component.css'
})
export class AddLivreComponent implements OnInit{
  listAuteurs:auteur[];
  listCategories:categorie[];
  livre:Livre|undefined;
  livreForm:FormGroup;

  constructor(private livreservice: LivreService,
              private router: Router,
              private formBuilder: FormBuilder,
              private auth:AuthService
              ){}

OnSubmit() {
  const livre: livreEdited = {
    titre: this.livreForm.value.titre,
    auteurs: this.livreForm.value.auteurs,
    categories:this.livreForm.value.categories,
    isbn: this.livreForm.value.isbn,
    synopsis: this.livreForm.value.synopsis
  };
  console.log(livre)
  this.livreservice.addLivre(livre).subscribe(()=>
  this.router.navigate(['/livres']));
}
ngOnInit() {
  const userS=localStorage.getItem('user')
  if ( userS!== null) {
    const userData=JSON.parse(userS)
      if(userData.is_superuser){
          this.livreForm = new FormGroup({
            titre: new FormControl('',[Validators.required]), // Initialiser les valeurs du formulaire
            auteurs: new FormControl([],[Validators.required]),
            categories: new FormControl([],[Validators.required]),
            isbn: new FormControl('',[Validators.required]),
            synopsis: new FormControl('',[Validators.required])
          });
            this.livreservice.getAuteurList().subscribe((auteurList)=>{
              this.listAuteurs = auteurList})
            this.livreservice.getCategorieList().subscribe((categorieList)=>{
              this.listCategories = categorieList})
       }else{
      this.router.navigate(['/livres']);
      }
    }else{
  this.router.navigate(['/login']);
    }
}
isSelected(): boolean{
  return true;
}


}