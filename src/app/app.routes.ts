import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/games', pathMatch: 'full' },
    { path: '', redirectTo: '/loans', pathMatch: 'full' },
    { path: 'categories', loadComponent: () => import('./category/category-list/category-list.page').then(m => m.CategoryListComponent) },
    { path: 'authors', loadComponent: () => import('./author/author-list/author-list.page').then(m => m.AuthorListComponent) },
    { path: 'games', loadComponent: () => import('../app/game/game-list/game-list.page').then(m => m.GameListComponent) },
    { path: 'clients', loadComponent: () => import('../app/client/client-list/client-list.page').then(m => m.ClientListComponent) },
    { path: 'loans', loadComponent: () => import('../app/loan/loan-list/loan-list.page').then(m => m.LoanListPage) }

];
