import {
  Directive,
  Renderer2,
  OnInit,
  ElementRef,
  HostListener,
  HostBinding,
  Input,
} from "@angular/core";

@Directive({
  selector: "[appImprovedHighlight]",
})
export class ImprovedHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @Input() defaultBackgroundColor: string = 'transparent';
  @Input() defaultHighlightColor: string = 'blue';


  @HostBinding('style.backgroundColor') backgroundColor = this.defaultBackgroundColor;

  ngOnInit() {
    this.backgroundColor = this.defaultBackgroundColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   "background-color",
    //   "blue"
    // );
    this.backgroundColor = this.defaultHighlightColor;
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   "background-color",
    //   "transparent"
    // );
    this.backgroundColor = this.defaultBackgroundColor;
  }
}
