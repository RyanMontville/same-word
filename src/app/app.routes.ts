import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ClearComponent } from './clear/clear.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'clear', component: ClearComponent}
];
