import { NgModule } from '@angular/core';
import { MediumsComponent } from './components/mediums/mediums.component';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorLoginComponent } from './components/administrator-login/administrator-login.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { TagsComponent } from './components/tags/tags.component';
import { ClipComponent } from './components/clip/clip.component';
import { AuthGuardService } from './services/administrator-login-services/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AddClipPecatenComponent } from './components/add-clip-pecaten/add-clip-pecaten.component';
import { AddClipTvRadioComponent } from './components/add-clip-tv-radio/add-clip-tv-radio.component';
import { TendersComponent } from './components/tenders/tenders.component';
import { SalesComponent } from './components/sales/sales.component';
import { NostrificationsComponent } from './components/nostrifications/nostrifications.component';
import { UsersComponent } from './components/users/users.component';
import { BankruptciesComponent } from './components/bankruptcies/bankruptcies.component';
import { RoleGuardGuard } from './guards/role-guard.guard';
import { LoaderComponent } from './components/loader/loader.component';
import { AdministratorsComponent } from './components/administrators/administrators.component';


const routes: Routes = [
  /*{ path: '', redirectTo: '/admin-login', pathMatch: 'full'},*/
  { path: 'admin-login', component: AdministratorLoginComponent},
  { 
    path: 'mediums', 
    component: MediumsComponent,
    canActivate:[AuthGuardService, RoleGuardGuard],
    data: {
      expectedRoles: ['Mediums']
    }
  },
  { 
    path: 'authors', 
    component: AuthorsComponent,
    canActivate:[AuthGuardService, RoleGuardGuard],
    data: {
      expectedRoles: ['Authors']
    }
  },
  { 
    path: 'tags', 
    component: TagsComponent,
    canActivate:[AuthGuardService, RoleGuardGuard],
    data: {
      expectedRoles: ['Tags']
    }
  },
  { 
    path: 'add-clip', 
    component: ClipComponent,
    canActivate:[AuthGuardService, RoleGuardGuard],
    data: {
      expectedRoles: ['Clips']
    }
  },
  { 
    path: '', 
    component: HomeComponent, 
    canActivate:[AuthGuardService]
  },
  { 
    path: 'clients', 
    component: ClientsComponent, 
    canActivate:[AuthGuardService, RoleGuardGuard],
    data: {
      expectedRoles: ['Clients']
    }
  },
  { 
    path: 'administrators', 
    component: AdministratorsComponent, 
    canActivate:[AuthGuardService, RoleGuardGuard],
    data: {
      expectedRoles: ['Administrators']
    }
  },
  { 
    path: 'tenders', 
    component: TendersComponent, 
    canActivate:[AuthGuardService, RoleGuardGuard],
    data: {
      expectedRoles: ['Tenders']
    }
  },
  { 
    path: 'sales', 
    component: SalesComponent, 
    canActivate:[AuthGuardService, RoleGuardGuard],
    data: {
      expectedRoles: ['Sales']
    }
  },
  { 
    path: 'bankruptcies', 
    component: BankruptciesComponent, 
    canActivate:[AuthGuardService, RoleGuardGuard],
    data: {
      expectedRoles: ['Bankruptcies']
    }
  },
  { 
    path: 'notifications', 
    component: NostrificationsComponent, 
    canActivate:[AuthGuardService, RoleGuardGuard],
    data: {
      expectedRoles: ['Notifications']
    }
  },
  { path: 'add-clip-pecaten', component: AddClipPecatenComponent, canActivate:[AuthGuardService]},
  { path: 'add-clip-tv-radio', component: AddClipTvRadioComponent, canActivate:[AuthGuardService]},
  { 
    path: 'users', 
    component: UsersComponent, 
    canActivate:[AuthGuardService, RoleGuardGuard],
    data: {
      expectedRoles: ['Administrators']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
