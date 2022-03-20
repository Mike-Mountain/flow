import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselComponent} from './components/carousel/carousel.component';
import { CarouselDirective } from './directives/carousel.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CarouselComponent,
    CarouselDirective
  ],
  exports: [
    CarouselComponent
  ]
})
export class SharedModule {
}
