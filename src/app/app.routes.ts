import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path:'',
        loadComponent:()=>import('./login/login.component')
    },
    {
        path:'start',
        loadComponent:()=>import('./praxis-profesor/praxis-profesor.component')
    },
    {
        path:'admin',
        loadComponent:()=>import('./dashboard/dashboard.component')
    }
    ,
    {
        path:'cargos',
        loadComponent:()=>import('./finanzas/cargos/cargos.component')
    }
    ,
    {
        path:'edoCta',
        loadComponent:()=>import('./finanzas/estado-cta/estado-cta.component')
    }
    ,
    {
        path:'pagos',
        loadComponent:()=>import('./finanzas/pagos/pagos.component')
    }
    ,
    {
        path:'cliente',
        loadComponent:()=>import('./rh/clientes/clientes.component')
    }
    ,
    {
        path:'users',
        loadComponent:()=>import('./rh/usuarios/usuarios.component')
    }
    
    
    
]as Routes