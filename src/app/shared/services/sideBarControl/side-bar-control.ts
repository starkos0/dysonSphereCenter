import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SideBarControl {
  public collapsedSideBar = signal<boolean | null>(true);
  public hideSideBar = signal<boolean>(false);

  constructor() {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }


  private checkIfMobile() {
    const mobile = window.innerWidth <= 768;

    this.hideSideBar.set(mobile ? true : false);
    console.log('Mobile:', mobile, 'Hide Sidebar:', this.hideSideBar());
    this.collapsedSideBar.set(mobile ? null : true);
  }
}
