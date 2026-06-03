/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { VerticeFormComponent } from './vertice-form.component';

describe('VerticeFormComponent', () => {
  let component: VerticeFormComponent;
  let fixture: ComponentFixture<VerticeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticeFormComponent ],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticeFormComponent);
    component = fixture.componentInstance;
    component.fromGroup = new FormGroup({
      lat: new FormControl(null),
      long: new FormControl(null),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
