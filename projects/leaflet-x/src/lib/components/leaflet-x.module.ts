import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletXComponent } from './leaflet-x/leaflet-x.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    LeafletXComponent
  ],

  exports: [ LeafletXComponent ]
})
export class LeafletXModule { }
