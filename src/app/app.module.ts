import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SystemComponent } from './system/system.component';
import { HttpClientModule } from '@angular/common/http';
import { GlobalVariablesComponent } from './global-variables/global-variables.component';
import { LogComponent } from './log/log.component';
import { ComponentsComponent } from './components/components.component';
import { ComponentDetailComponent } from './component-detail/component-detail.component';
import { PackageSelectorComponent } from './shared/package-selector/package-selector.component';
import { JsonEditorComponent } from './shared/json-editor/json-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    SystemComponent,
    GlobalVariablesComponent,
    LogComponent,
    ComponentsComponent,
    ComponentDetailComponent,
    PackageSelectorComponent,
    JsonEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
