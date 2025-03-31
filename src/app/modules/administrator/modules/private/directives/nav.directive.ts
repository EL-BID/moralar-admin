import { Directive, AfterViewInit, ElementRef } from '@angular/core';
import { gsap, TweenLite } from 'gsap';

@Directive({
  selector: '[appNav]'
})
export class NavDirective implements AfterViewInit {

  listItem: null | HTMLElement = null;
  isLocked = false;

  constructor(
    private elementRef: ElementRef
  ) { }

  private openList(listItem: HTMLElement): void {
    const list = listItem.querySelector('ul');
    if (list) {
      gsap.set(list, { display: 'block' });
      TweenLite.to(list, 0.25, {
        height: 'auto',
        onStart: () => {
          this.isLocked = true;
          listItem.classList.add('active');
        },
        onComplete: () => {
          this.listItem = listItem;
          this.isLocked = false;
        }
      });
    }
  }

  private closeList(listItem: HTMLElement): void {
    const list = listItem.querySelector('ul');
    if (list) {
      gsap.set(list, { display: 'block' });
      TweenLite.to(list, 0.25, {
        height: 0,
        onStart: () => {
          this.isLocked = true;
          listItem.classList.remove('active');
        },
        onComplete: () => {
          this.listItem = null;
          this.isLocked = false;
        }
      });
    }
  }

  ngAfterViewInit(): void {
    const listItems = this.elementRef.nativeElement.childNodes;
    listItems.forEach((listItem) => {
      listItem.addEventListener('click', () => {
        if (this.isLocked === false) {
          if (this.listItem === null) {
            this.openList(listItem);
          } else {
            if (this.listItem !== listItem) {
              this.closeList(this.listItem);
              this.openList(listItem);
            }
          }
        }
      });
      const list = listItem.querySelector('ul');
      if (list) {
        list.addEventListener('click', (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
        });
      }
    });
  }

}
