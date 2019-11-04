import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthoriseRoleGuard } from 'ngscaffolding-core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full', canActivate: [AuthoriseRoleGuard]
  },
  { path: 'login', loadChildren: './pages/logon/logon.module#LogonPageModule' },
  { path: 'logoff', loadChildren: './pages/logoff/logoff.module#LogoffPageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule', canActivate: [AuthoriseRoleGuard] },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthoriseRoleGuard] },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule', canActivate: [AuthoriseRoleGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
