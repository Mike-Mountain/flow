import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import {RouterModule} from "@angular/router";
import { NavigationComponent } from './components/navigation/navigation.component';
import {SharedModule} from "@flow/shared";

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule],
  declarations: [
    LayoutComponent,
    NavigationComponent
  ],
  exports: [LayoutComponent]
})
export class ContainerCoreModule {}
