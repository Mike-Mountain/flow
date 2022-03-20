import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'ctr-core-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public images: string[] = [];
  public selectedImage = '1';
  public sidebarOpen = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:3000/images/blender')
      .pipe(
        map((data: any) => data.images.map((image: any) => image.assetPath))
      )
      .subscribe((data) => {
        this.images = data;
        this.setSelectedImage(this.images[0]);
      });
  }

  setSelectedImage(image: string) {
    console.log(image);
    this.selectedImage = image;
  }

  toggleSidebar(isOpen: boolean) {
    this.sidebarOpen = isOpen;
  }
}
