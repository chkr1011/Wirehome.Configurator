import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system/system.component';
import { GlobalVariablesComponent } from './global-variables/global-variables.component';
import { LogComponent } from './log/log.component';
import { ComponentsComponent } from './components/components.component';

const routes: Routes = [
    { path: 'system', component: SystemComponent },
    { path: 'global-variables', component: GlobalVariablesComponent },
    { path: 'log', component: LogComponent },
    { path: 'components', component: ComponentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
