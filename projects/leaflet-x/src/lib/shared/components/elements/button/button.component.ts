import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core'

@Component({
  selector: 'UIButton',
  template: `
      <button
        [type]="type"
        class="btn"
        [class]="buildClass"
        [disabled]="disabled"
        (click)="onClickButton($event)"
        [style]="customStyle"
      >
        <ng-content></ng-content>
      </button>
    `
})

export class ButtonComponent {
  @ViewChild(ButtonComponent) button
  @Input() type = 'button'
  @Input() color = 'primary'
  @Input() customStyle: string;
  @Input() action: () => void
  @Input('customClass') class = ''
  @Input() size: 'sm' | 'lg'
  @Input() disabled = false
  @Input() outline = false
  @Input() round = false
  @Input() light = false

  @HostBinding('class.btn-block')
  @Input() block = false

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>()

  get buildColor(): string {
    return this.color ? `btn-${this.color}` : 'btn-default'
  }

  get buildSize(): string {
    return this.size ? `btn-${this.size}` : ''
  }

  get buildLight(): string {
    return this.light ? `bg-light-${this.color}` : null
  }

  get buildRound(): string {
    return this.round ? 'round' : ''
  }

  get buildBlock(): string {
    return this.block ? `btn-block` : null
  }

  get buildOutline(): string {
    return this.outline ? `btn-outline-${this.color}` : null
  }

  get buildClass(): string {
    const getColor = this.buildLight ?? this.buildOutline ?? this.buildColor
    return `${this.buildSize} ${getColor} ${this.class} ${this.buildBlock} ${this.buildRound}`
  }

  onClickButton(event): void {
    this.onClick.emit(event)
  }
}
