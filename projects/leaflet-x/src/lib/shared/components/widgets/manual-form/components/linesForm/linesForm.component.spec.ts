/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LinesFormComponent } from './linesForm.component';

describe('LinesFormComponent', () => {
  let component: LinesFormComponent;
  let fixture: ComponentFixture<LinesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinesFormComponent ],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
