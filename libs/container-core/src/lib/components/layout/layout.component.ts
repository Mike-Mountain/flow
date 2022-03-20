import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ctr-core-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public images: string[] = [];
  public selectedImage = '1';

  constructor() { }

  ngOnInit(): void {
    this.images = [...Array(21).keys()].slice(1).map(item => item.toString());
  }

  setSelectedImage(image: string) {
    console.log(image);
    this.selectedImage = image;
  }

}
