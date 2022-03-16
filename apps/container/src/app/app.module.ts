import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NxWelcomeComponent} from './nx-welcome.component';
import {RouterModule} from '@angular/router';
import {ContainerCoreModule} from "@flow/container-core";

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {initialNavigation: 'enabledBlocking'}),
    ContainerCoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
