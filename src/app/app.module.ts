import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ListCardsComponent } from './list-cards/list-cards.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatIconModule, MatBadgeModule, MatCheckboxModule, MatGridListModule, MatMenuModule, MatToolbarModule, MatBottomSheetModule, MatSidenavModule, MatListModule, MatTooltipModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from './avatar/avatar.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {

};

@NgModule({
  declarations: [
    ListCardsComponent,
    AppComponent,
    AvatarComponent,
    MainHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatBadgeModule, MatCheckboxModule, MatGridListModule,
    MatBottomSheetModule, MatSidenavModule, MatListModule,
    MatTooltipModule,
    MatToolbarModule, MatIconModule,
    AppRoutingModule,
    PerfectScrollbarModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ListCardsComponent]
})
export class AppModule { }
