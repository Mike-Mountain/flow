import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'shared-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() images: string[] = [];
  @Output() selectedImage = new EventEmitter<string>();

  public currentImageIdx = 0;

  constructor() {}

  ngOnInit(): void {}

  selectImage(direction?: 'next' | 'previous') {
    if (direction === 'next' && this.currentImageIdx < this.images.length - 1) {
      this.currentImageIdx += 1;
    } else if (direction === 'previous' && this.currentImageIdx > 0) {
      this.currentImageIdx -= 1;
    }
    this.setSelectedImage(this.images[this.currentImageIdx]);
  }

  selectByClick(imageIdx: number) {
    if (imageIdx === this.currentImageIdx) {
      return;
    }
    this.currentImageIdx = imageIdx;
    this.setSelectedImage(this.images[this.currentImageIdx]);
  }

  setSelectedImage(image: string) {
    this.selectedImage.emit(image);
  }

  onImageClick(image: string, idx: number) {
    this.currentImageIdx = idx;
    this.setSelectedImage(image);
  }
}
