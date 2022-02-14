import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ConnectComponent } from './connect/connect.component';
import { AuthServiceService } from './services/auth-service.service';
import { WalletsConnectService } from './services/wallets-connect.service';
import { HeaderComponent } from './shared/header/header.component';
import { PopUpComponent } from './shared/pop-up/pop-up.component';
import { SelectionComponent } from './selection/selection.component';
import { AfterSelectionComponent } from './after-selection/after-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectComponent,
    HeaderComponent,
    PopUpComponent,
    SelectionComponent,
    AfterSelectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthServiceService,WalletsConnectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
