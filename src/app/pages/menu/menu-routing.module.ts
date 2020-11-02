import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsPageModule } from '../product-details/product-details.module';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'folder/:id',
        loadChildren: () => import('../../folder/folder.module').then(m => m.FolderPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'product-list',
        loadChildren: () => import('../product-list/product-list.module').then(m => m.ProductListPageModule)
      },
      {
        path: 'my-account',
        loadChildren: () => import('../my-account/my-account.module').then(m => m.MyAccountPageModule)
      },
      {
        path: 'my-cart',
        loadChildren: () => import('../my-cart/my-cart.module').then(m => m.MyCartPageModule)
      },
      {
        path: 'product-detail',
        loadChildren: () => import('../my-cart/my-cart.module').then(m => m.MyCartPageModule)
      },
      {
        path: 'product-detail/:id',
        loadChildren: () => import('../product-details/product-details.module').then(m => ProductDetailsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule { }
