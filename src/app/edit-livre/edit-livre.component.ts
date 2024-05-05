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
  selector: 'app-edit-livre',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatSelectModule, ReactiveFormsModule, MatInputModule, CommonModule],
  templateUrl: './edit-livre.component.html',
  styleUrl: './edit-livre.component.css'
})
export class EditLivreComponent implements OnInit{
  listAuteurs:auteur[];
  listCategories:categorie[];

  livre:Livre|undefined;

  livreForm :FormGroup;

  constructor(private route: ActivatedRoute,
              private livreservice: LivreService,
              private router: Router,
              private formBuilder: FormBuilder){}
  ngOnInit() {
    this.livreForm = this.formBuilder.group({
      titre: [''], // Initialiser les valeurs du formulaire
      auteurs: [[]],
      categories: [[]],
      isbn: [''],
      synopsis: ['']
    });

    const livreId: string|null = this.route.snapshot.paramMap.get('id');
    this.livreservice.getAuteurList().subscribe((auteurList)=>{
      this.listAuteurs = auteurList})
    this.livreservice.getCategorieList().subscribe((categorieList)=>{
      this.listCategories = categorieList})
      if(livreId){
      this.livreservice.getLivreById(+livreId).subscribe((livre) =>{
        this.livre = livre
        this.livreForm.patchValue({
          titre: livre.titre,
          isbn:livre.isbn,
          synopsis:livre.synopsis
          
        });
      this.livreForm.controls['auteurs'].setValue(livre.auteurs)
      this.livreForm.controls['categories'].setValue(livre.categories)
        ;
        })
      }
    }
    compare(c1: {nom: string}, c2: {nom: string}) {
      return c1 && c2 && c1.nom === c2.nom;
    }
     
isSelected(): boolean{
  return true;
}

OnSubmit() {
  const livreId: string|null = this.route.snapshot.paramMap.get('id');
 /*  auteursObjets.forEach((obj:{id?:number,nom:string,bio?:string})=>{
    delete obj.bio
    delete obj.id
  }); */
  const livre: livreEdited = {
    titre: this.livreForm.value.titre,
    auteurs: this.livreForm.value.auteurs,
    categories:this.livreForm.value.categories,
    isbn: this.livreForm.value.isbn,
    synopsis: this.livreForm.value.synopsis
  };
  
  if(livreId){
  this.livreservice.updateLivre(+livreId,livre).subscribe(()=>
  this.router.navigate(['/livres']));}
}
}
