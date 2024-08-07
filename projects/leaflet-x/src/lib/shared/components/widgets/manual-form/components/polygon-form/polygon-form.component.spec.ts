/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PolygonFormComponent } from './polygon-form.component';

describe('PolygonFormComponent', () => {
  let component: PolygonFormComponent;
  let fixture: ComponentFixture<PolygonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolygonFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolygonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
