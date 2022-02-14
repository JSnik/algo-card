import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { SelectionComponent } from './selection/selection.component';
import { AfterSelectionComponent } from './after-selection/after-selection.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'connect', pathMatch: 'full' },
  { path: 'connect', component: ConnectComponent },
  {
    path: 'selection',
    component: SelectionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'after-selection',
    component: AfterSelectionComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
