import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ButtonComponent } from './button.component'


describe('ButtonComponent', () => {
  let component: ButtonComponent
  let fixture: ComponentFixture<ButtonComponent>
  let submitEl: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    submitEl = fixture.debugElement
  })

  it('Should create', () => {
    expect(component).toBeTruthy()
  })

  it('Should have type button, submit and reset', () => {
    const arrType = ['button', 'submit', 'reset']
    const type = arrType[Math.floor(Math.random() * (arrType.length - 1)) + 1]
    component.type = type
    fixture.detectChanges()
    const el = submitEl.nativeElement.querySelector('button')
    expect(el.type).toBe(type)
  })

  it('Should render color class btn-primary, btn-danger, btn-info', () => {
    const arrColor = ['primary', 'danger', 'warning', 'info']
    const color = arrColor[Math.floor(Math.random() * (arrColor.length - 1)) + 1]
    component.color = color
    fixture.detectChanges()
    const el = submitEl.query(By.css(`.btn-${color}`)).nativeElement
    expect(el.classList.contains(`btn-${color}`)).toBeTruthy()
  })

  it('Should render between sm or lg class btn-sm or btn-lg', () => {
    const arrSize = ['sm', 'lg']
    const size = arrSize[Math.round(Math.random())]
    component.size = size as 'sm' | 'lg'
    fixture.detectChanges()
    const el = submitEl.query(By.css(`.btn-${size}`)).nativeElement
    expect(el.classList.contains(`btn-${size}`)).toBeTruthy()
  })

  it('Should full size class btn-block', () => {
    component.block = true
    fixture.detectChanges()
    const el = submitEl.query(By.css('.btn-block')).nativeElement
    expect(el.classList.contains('btn-block')).toBeTruthy()
  })

  it('Should be disabled', () => {
    component.disabled = true
    fixture.detectChanges()
    const el = submitEl.query(By.css('button')).nativeElement
    expect(el.disabled).toBeTruthy()
  })

  it('Should have class btn-outline', () => {
    const arrColor = ['primary', 'danger', 'warning', 'info']
    const color = arrColor[Math.floor(Math.random() * (arrColor.length - 1)) + 1]
    component.color = color
    component.outline = true
    fixture.detectChanges()
    const el = submitEl.query(By.css(`.btn-outline-${color}`)).nativeElement
    expect(el.classList.contains(`btn-outline-${color}`)).toBeTruthy()
  })

  it('Should have class round', () => {
    component.round = true
    fixture.detectChanges()
    const el = submitEl.query(By.css('.round')).nativeElement
    expect(el.classList.contains('round')).toBeTruthy()
  })

  it('Should have class btn-light', () => {
    const arrColor = ['primary', 'danger', 'warning', 'info']
    const color = arrColor[Math.floor(Math.random() * (arrColor.length - 1)) + 1]
    component.color = color
    component.light = true
    fixture.detectChanges()
    const el = submitEl.query(By.css(`.bg-light-${color}`)).nativeElement
    expect(el.classList.contains(`bg-light-${color}`)).toBeTruthy()
  })

  it('Should have text value', () => {
    const el = submitEl.query(By.css('button')).nativeElement
    el.innerText = 'test'
    expect(el.innerText).toEqual('test')
  })

  it('Should have mycustom class', () => {
    component.class = 'mycustom'
    fixture.detectChanges()
    const el = submitEl.query(By.css('.mycustom')).nativeElement
    expect(el.classList.contains('mycustom')).toBeTruthy()
  })
})
