import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletXLegacyComponent } from './leaflet-x-legacy/leaflet-x-legacy.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    LeafletXLegacyComponent
  ],

  exports: [ LeafletXLegacyComponent ]
})
export class LeafletXLegacy { }
