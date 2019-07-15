import { Directive, ElementRef, Input, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { element } from 'protractor';

@Directive({
  selector: '[custom-loading]'
})

export class LoadingDirective implements OnInit {
  @Input() load: boolean;
  loadingHtml = `
    <div class="sk-folding-cube sk-spinner">
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
    </div>`
  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }
  ngOnInit() {
  

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.load) {
      if (this.load) {
        // Al elemento html que usa la directiva se le agrega el loadingHtml
        // this.elRef.nativeElement.innerHTML += this.loadingHtml;
        // Se activa el sk-loading que cubre todo el contenedor
        this.renderer.addClass(this.elRef.nativeElement, 'sk-loading');
        
      } else {
        this.renderer.removeClass(this.elRef.nativeElement, 'sk-loading');
        
      }
    }
  }
}
