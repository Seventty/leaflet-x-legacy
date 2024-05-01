import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletXComponent } from './leaflet-x.component';

describe('LeafletXComponent', () => {
  let component: LeafletXComponent;
  let fixture: ComponentFixture<LeafletXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeafletXComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafletXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
