import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core'

@Component({
  selector: 'UIIcon',
  template: `
    <i
    [class]="builtClass"
    placement="top"
    container="body"
    triggers="mouseenter:mouseleave"
    ></i>
  `
})
export class IconComponent implements OnInit {
  @Input() sufix = 'fa';
  @Input() spin = false;
  @Input() icon: string;
  @Input() size: 'lg' | 'md' | 'sm' = 'md';
  @Input() title: string = "";
  @Input('customClass') class: string = '';
  builtClass: string

  constructor() { }

  ngOnInit() {
    this.builtClass = this.spin ?
      `${this.sufix} ${this.sufix}-${this.icon} fa-spin fa-${this.size} ${this.class}`
      : `${this.sufix} ${this.sufix}-${this.icon} fa-${this.size} ${this.class}`
  }

}

