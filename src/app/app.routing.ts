import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ManageComponent } from './manage/manage.component';
import { RequestsComponent } from './requests/requests.component'
import { AdminAuthGuard } from './admin-auth.guard';
import { UserAuthGuard } from './user-auth.guard';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const appRoutes:Routes =[
{
    path:'signup',
    component:SignupComponent
}, 
{
    path:'signin',
    component:SigninComponent
},
{
    path:'register',
    component:RegisterComponent,
    canActivate:[UserAuthGuard]
},
{
    path:'admindash',
    component:AdminDashboardComponent,
    canActivate:[AdminAuthGuard]
},   
{
    path:'manage',
    component:ManageComponent,
    canActivate:[AdminAuthGuard]
},
{
    path:'requests',
    component:RequestsComponent,
    canActivate:[AdminAuthGuard]
},
{
    path:'userdashboard',
    component:UserDashboardComponent,
    canActivate:[UserAuthGuard]
},  
{
    path: '404',
    component: PageNotFoundComponent
},
{
    path: '',
    redirectTo: '/signin', pathMatch: 'full'
},
{
    path: '**',
    redirectTo: '404', pathMatch: 'full'
}
];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class AppRouterModule{}

export const RoutingComponent = [
    SignupComponent,
    SigninComponent,
    RegisterComponent,
    AdminDashboardComponent,
    ManageComponent,
    RequestsComponent,
    PageNotFoundComponent];