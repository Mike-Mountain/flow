import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[sharedCarousel]',
})
export class CarouselDirective implements AfterViewInit {

  @Input() set imageIdx(value: number) {
    if (value !== undefined) {
      this.scrollTo(value);
    }
  };

  private element: HTMLElement;
  private selectedImage: Element | undefined;
  private nodes: Element[] = [];
  private currentImageIdx = 0;

  @HostListener('scroll', ['$event'])
  handleClick(event: Event) {
    // console.log(event);
  }

  constructor(private _el: ElementRef<HTMLElement>,
              private _renderer: Renderer2) {
    this.element = _el.nativeElement;
  }

  ngAfterViewInit(): void {
    if (this.element.children.length > 0) {
      this.nodes = Array.from(this.element.children);
      this.selectedImage = this.nodes[this.currentImageIdx].children[0];
      this._renderer.addClass(this.selectedImage, 'carousel-selected');
    }
  }

  scrollTo(imageIdx: number) {
    if (this.canSetImage(this.currentImageIdx, imageIdx)) {
      this.currentImageIdx = imageIdx;
      this._renderer.removeClass(this.selectedImage, 'carousel-selected');
      this.selectedImage = this.nodes[imageIdx].children[0];
      this._renderer.addClass(this.selectedImage, 'carousel-selected');
      this.selectedImage.scrollIntoView({behavior: "smooth"});
    }
  }

  private canSetImage(currentIdx: number, newIdx: number): boolean {
    // Make sure we are not going beyond the limits of the array
    if (newIdx > currentIdx) {
      // Direction next
      return newIdx < this.nodes.length - 1;
    } else if (newIdx < currentIdx) {
      // Direction previous
      return newIdx >= 0;
    } else {
      // No directional change
      return false;
    }
  }

}
