import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ListCardsComponent } from './list-cards/list-cards.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatIconModule, MatBadgeModule, MatCheckboxModule, MatGridListModule, MatMenuModule, MatToolbarModule, MatBottomSheetModule, MatSidenavModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [
    ListCardsComponent,
    AppComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatBadgeModule, MatCheckboxModule, MatGridListModule,
    MatBottomSheetModule, MatSidenavModule, MatListModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ListCardsComponent]
})
export class AppModule { }
