import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ctr-core-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Output() sidebarOpen = new EventEmitter<boolean>();
  isOpen = false;

  constructor() {}

  ngOnInit(): void {}

  toggleSideBar() {
    if (window.innerWidth < 910) {
      // Small screen
      this.isOpen = !this.isOpen;
      console.log(this.isOpen);
      this.sidebarOpen.emit(this.isOpen);
    }
  }
}
