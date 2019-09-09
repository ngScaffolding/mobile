import { HostListener, Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({ selector: '[ngsFillHeight]' })
export class FillHeightDirective implements AfterViewInit {
  @Input() footerElement = null;
  @Input() fixedHeight = 0;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.calculateAndSetElementHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateAndSetElementHeight();
  }

  private calculateAndSetElementHeight() {
    if (this.fixedHeight > 0) {
      this.el.nativeElement.style.height = `${this.fixedHeight}px`;
    } else {
      this.el.nativeElement.style.overflow = 'auto';
      const windowHeight = window.innerHeight;
      const elementOffsetTop = this.getElementOffsetTop();
      const elementMarginBottom = this.el.nativeElement.style.marginBottom;
      const footerElementMargin = this.getfooterElementMargin();

      this.el.nativeElement.style.height = `${windowHeight - footerElementMargin - elementOffsetTop - 36}px`;
    }
  }

  private getElementOffsetTop() {
    return this.el.nativeElement.getBoundingClientRect().top;
  }

  private getfooterElementMargin() {
    if (!this.footerElement) {
      return 0;
    }
    const footerStyle = window.getComputedStyle(this.footerElement);
    return parseInt(footerStyle.height, 10);
  }
}