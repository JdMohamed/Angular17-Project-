import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  email: string;
  password: string;
}

export interface UserP {
  id: string;
  name: string;
  email: string;
  is_superuser: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    throw new Error('Method not implemented.');
  }

  redirectUrl: string;
  Su: boolean = false;

  signIn(user: User):Observable<any> {
      console.log(user);
      return this.http.post<any>('http://127.0.0.1:8000/api/login', user, { withCredentials: true })
      
     
    }
  
    getUser(){
      return localStorage.getItem('user');
    }
  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return authToken !== null;
  }

  doLogout() {
    this.http.post<any>('http://127.0.0.1:8000/api/logout', {}).subscribe(() => {
      console.log("logout");
      localStorage.removeItem('access_token');
      this.router.navigate(['/login']);
    });
  }
 
}
