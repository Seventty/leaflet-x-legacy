import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileExportComponent } from './components/file-export/file-export.component';
import { LegendBarComponent } from './components/legend-bar/legend-bar.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    HttpClientModule

  ],
  declarations: [
    ModalComponent,
    FileUploadComponent,
    FileExportComponent,
    LegendBarComponent,
  ],
  exports: [
    ModalComponent,
    FileUploadComponent,
    FileExportComponent,
    LegendBarComponent
  ]
})
export class SharedModule { }
