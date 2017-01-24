import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { 
  SharedModule,
  ApiService, 
  JwtService,
  UserService

    } from './shared';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true});


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HomeModule,
    rootRouting,
    SharedModule,
    AuthModule
  ],
  providers: [
    ApiService,
    JwtService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
