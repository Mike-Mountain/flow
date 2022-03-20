import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

interface position {
  x: number;
  y: number;
  top: number;
  left: number;
}

interface direction {
  x: number;
  y: number;
}

@Directive({
  selector: '[sharedCarousel]',
})
export class CarouselDirective implements AfterViewInit {
  @Input() set imageIdx(value: number | undefined) {
    this._imageIdx = value;
    if (value) {
      this.scrollTo(value);
    }
  }

  get imageIdx(): number | undefined {
    return this._imageIdx;
  }

  @Output() selectImage = new EventEmitter<number>();

  private element: HTMLElement;
  private selectedImage: Element | undefined;
  private nodes: Element[] = [];
  private currentImageIdx = 0;

  private position: position | undefined;
  private isScrolling = false;

  private _imageIdx: number | undefined;

  @HostListener('mousedown', ['$event'])
  handleMouseDown(event: MouseEvent) {
    this.isScrolling = false;
    // Set up the position for dragging
    this.position = {
      x: event.clientX,
      y: event.clientY,
      top: this.element.scrollTop,
      left: this.element.scrollLeft,
    };
  }

  @HostListener('click')
  onImageClick() {
    if (!this.isScrolling && this.imageIdx !== undefined) {
      this.scrollTo(this.imageIdx);
    }
  }

  @HostListener('mousemove', ['$event'])
  handleMouseMove(event: MouseEvent) {
    // Scroll the container when the user drags their mouse
    event.preventDefault();
    if (this.position) {
      this.isScrolling = true;
      const direction: direction = {
        x: event.clientX - this.position.x,
        y: event.clientY - this.position.y,
      };
      this.element.scrollTop = this.position.top - direction.y;
      this.element.scrollLeft = this.position.left - direction.x;
    }
  }

  @HostListener('mouseup')
  handleMouseUp() {
    this.position = undefined;
  }

  @HostListener('mousewheel', ['$event'])
  handleScroll(event: WheelEvent) {
    this.element.scrollBy({ left: -event.deltaY, behavior: 'smooth' });
  }

  constructor(
    private _el: ElementRef<HTMLElement>,
    private _renderer: Renderer2
  ) {
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
      this.selectedImage.scrollIntoView({ behavior: 'smooth' });
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
