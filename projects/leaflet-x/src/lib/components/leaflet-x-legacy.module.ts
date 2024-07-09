import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletXLegacyComponent } from './leaflet-x-legacy/leaflet-x-legacy.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  declarations: [
    LeafletXLegacyComponent
  ],

  exports: [ LeafletXLegacyComponent ]
})
export class LeafletXLegacyModule { }
