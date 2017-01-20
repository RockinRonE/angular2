import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; 

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared';

const authRouting: ModuleWithProviders = RouterModule.forRoot([
    {
        path: 'login',
        component: AuthComponent
    },
    {
        path: 'register',
        component: AuthComponent
    }
]);

@NgModule({
    imports: [
        authRouting,
        SharedModule
    ],
    declarations: [
        AuthComponent
    ]
})

export class AuthModule {}