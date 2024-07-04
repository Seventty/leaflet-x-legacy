import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FileUploadComponent } from './components/widgets/file-upload/file-upload.component';
import { FileExportComponent } from './components/widgets/file-export/file-export.component';
import { HttpClientModule } from '@angular/common/http';
import { IconComponent } from './components/elements/icon/icon.component';
import { ButtonComponent } from './components/elements/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LegendBarComponent } from './components/widgets/legend-bar/legend-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbCollapseModule,
  ],
  declarations: [
    ModalComponent,
    FileUploadComponent,
    FileExportComponent,
    IconComponent,
    ButtonComponent,
    LegendBarComponent
  ],
  exports: [
    ModalComponent,
    FileUploadComponent,
    FileExportComponent,
    IconComponent,
    ButtonComponent,
    LegendBarComponent
  ]
})
export class SharedModule { }
