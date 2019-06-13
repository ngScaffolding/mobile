import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthoriseRoleGuard } from 'ngscaffolding-core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full', canActivate: [AuthoriseRoleGuard]
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule', canActivate: [AuthoriseRoleGuard]
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule', canActivate: [AuthoriseRoleGuard]
  },
  { path: 'login', loadChildren: './logon/logon.module#LogonPageModule' },
  { path: 'logoff', loadChildren: './logoff/logoff.module#LogoffPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule',canActivate: [AuthoriseRoleGuard] },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule', canActivate: [AuthoriseRoleGuard] },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule', canActivate: [AuthoriseRoleGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
