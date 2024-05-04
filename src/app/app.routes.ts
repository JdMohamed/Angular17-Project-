import { Routes } from '@angular/router';
import { ListLivreComponent } from './list-livre/list-livre.component';
import { EditLivreComponent } from './edit-livre/edit-livre.component';
import { LivreService } from './livre.service';
import { AddLivreComponent } from './add-livre/add-livre.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    
    {providers:[LivreService,AuthService],
        
     path: 'livres',component:ListLivreComponent, canActivate: [authGuard]},
     {providers:[AuthService],
         path: 'login', component: LoginComponent},
    {path: 'edit/livre/:id',component:EditLivreComponent, canActivate: [authGuard]},
    {path: 'add/livre',component:AddLivreComponent, canActivate: [authGuard]},
    {providers:[AuthService],
        path: 'profile',component:ProfileEditComponent, canActivate: [authGuard]}
];
