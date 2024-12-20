import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';


export const routes: Routes = 
[
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full',
    },
    {
        path:'home',
        component:HomePageComponent,
    },
    {
        path:'login',
        loadComponent:()=>import("./pages/login-page/login-page.component").then(c => c.LoginPageComponent),
    },
    {
        path:'login-patient',
        loadComponent:()=>import("./pages/login-patient-page/login-patient-page.component").then(c => c.LoginPatientPageComponent),
    },
    {
        path:'admin',
        loadComponent: () => import("./pages/admin-page/admin-page.component").then(c => c.AdminPageComponent),

    },
    {
        path:'manager',
        loadComponent: () => import("./pages/manager-page/manager-page.component").then(c => c.ManagerPageComponent),

    },
    {
        path:'reception',
        loadComponent: () => import("./pages/reception-page/reception-page.component").then(c => c.ReceptionPageComponent),
    },
    {
        path:'clinic',
        loadComponent: () => import("./pages/clinic-page/clinic-page.component").then(c => c.ClinicPageComponent),

    },
    {
        path:'emergency-male',
        loadComponent: () => import("./pages/emergency-male-page/emergency-male-page.component").then(c => c.EmergencyMalePageComponent),

    },
    {
        path:'emergency-female',
        loadComponent: () => import("./pages/emergency-female-page/emergency-female-page.component").then(c => c.EmergencyFemalePageComponent),

    },
    {
        path:'pharmacy',
        loadComponent: () => import("./pages/pharmacy-page/pharmacy-page.component").then(c => c.PharmacyPageComponent),

    },
    {
        path:'patient',
        loadComponent: () => import("./pages/patient-page/patient-page.component").then(c => c.PatientPageComponent),
    },
    {
    path:'**',
        redirectTo:'home',
    },
    

];
