import { RouterModule, Routes } from '@angular/router';

// Guards
import { LoginGuardGuard } from '../services/service.index';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { MailingComponent } from './mailing/mailing.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress bard' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Account Settings' } },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },

            // Mantenimientos
            { path: 'usuarios', component: UsersComponent, data: { titulo: 'Mantenimiento de usuarios' } },
            { path: 'mailing', component: MailingComponent, data: { titulo: 'Mailing' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
     },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
