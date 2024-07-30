import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletXLegacyComponent } from './leaflet-x-legacy/leaflet-x-legacy.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSidebarControlModule } from '@runette/ngx-leaflet-sidebar';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxSidebarControlModule
  ],
  declarations: [
    LeafletXLegacyComponent
  ],

  exports: [ LeafletXLegacyComponent ]
})
export class LeafletXLegacyModule { }
