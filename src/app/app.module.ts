import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SharedModule } from './shared/shared.module';
import localeJa from '@angular/common/locales/ja';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeJa);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFireAnalyticsModule,
    SharedModule,
  ],
  providers: [
    { provide: REGION, useValue: 'asia-northeast1' },
    { provide: LOCALE_ID, useValue: 'ja-JP' },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
