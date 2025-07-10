import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
    },
    {
        path: 'calculator',
        loadComponent: () => import('./pages/calculator/calculator').then(m => m.Calculator)
    },
    {
        path: 'quickRatios',
        loadComponent: () => import('./pages/quick-ratios/quick-ratios').then(m => m.QuickRatios)
    }
];