import { Directive, OnInit, ElementRef, Renderer, Input} from '@angular/core';

@Directive({
    selector: '[jhiActiveMenu]'
})
export class ActiveMenuDirective implements OnInit {
    @Input() jhiActiveMenu: string;

    constructor(private el: ElementRef, private renderer: Renderer) {}

    ngOnInit() {
    }

    updateActiveFlag(selectedLanguage) {
      if (this.jhiActiveMenu === selectedLanguage) {
          this.renderer.setElementClass(this.el.nativeElement, 'active', true);
      } else {
          this.renderer.setElementClass(this.el.nativeElement, 'active', false);
      }
    }
}
