import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: '',
        component: Home,
        children: [
            {
                path: 'home',
                loadComponent: () => import('./pages/home/home').then(m => m.Home)

            }
        ]
    }
];
