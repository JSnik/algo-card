import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ConnectComponent } from './connect/connect.component';
import { WalletsConnectService } from './services/wallets-connect.service';
import { PopUpComponent } from './shared/pop-up/pop-up.component';
import { SelectionComponent } from './selection/selection.component';
import { AfterSelectionComponent } from './after-selection/after-selection.component';
import {DropDownSelectorComponent} from "./shared/drop-down-selector/drop-down-selector.component";
import {HeaderComponent} from "./shared/header/header.component";
import {ReactiveFormsModule} from "@angular/forms";
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ConnectComponent,
    PopUpComponent,
    SelectionComponent,
    AfterSelectionComponent,
    DropDownSelectorComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
