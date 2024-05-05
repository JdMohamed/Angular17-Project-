import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Livre, auteur, categorie } from './livre';
import { environement } from '../environements/environement';
import { UserP } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LivreService {
private readonly server:string = environement.API_BASE_URL;
  constructor(private http:HttpClient) { }
  getUserList():Observable<UserP[]>{
    return this.http.get<UserP[]>
    (`${this.server}/api/users`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }
  getLivreList():Observable<Livre[]>{
    return this.http.get<Livre[]>
    (`${this.server}/api/livre/`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }
  getLivreById(id:number):Observable<Livre>{
    return this.http.get<Livre[]>
    (`${this.server}/api/livre/${id}`,).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }
  getAuteurList():Observable<auteur[]>{
    return this.http.get<auteur[]>
    (`${this.server}/api/auteur/`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getCategorieList():Observable<categorie[]>{
    return this.http.get<categorie[]>
    (`${this.server}/api/categorie/`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  updateLivre(livreID:number, livre:Object):Observable<Livre>{
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})}
    return this.http.put<Livre>
    (`${this.server}/api/livre/${livreID}/`,livre,httpOptions)
  }
  updateUser(id:Number):Observable<UserP>{
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})}
    return this.http.put<UserP>
    (`${this.server}/api/updateUserPriv/${id}`,httpOptions)

  }


  addLivre(livre:Object):Observable<Livre>{
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})}
    return this.http.post<Livre>
    (`${this.server}/api/livre/`,livre,httpOptions)
  }

  deleteLivre(livreID:number):Observable<null>{
    return this.http.delete
    (`${this.server}/api/livre/${livreID}/`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error,null))
    );
  }

  private handleError(error: Error, errorValue: any){ // on met any au lieu de []|undefined pour ne pas casser la tète avec le typage
    console.log(error);
    return of(errorValue);
  
   }
  
   private log(response: any){
    console.table(response);
  }
}
