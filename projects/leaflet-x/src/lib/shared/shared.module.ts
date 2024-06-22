import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileExportComponent } from './components/file-export/file-export.component';
import { HttpClientModule } from '@angular/common/http';
import { ManualEntriesFormComponent } from './components/manual-entries-form/manual-entries-form.component';
import { IconComponent } from './components/icon/icon.component';
import { LinesFormComponent } from './components/manual-entries-form/components/lines-form/lines-form.component';
import { ButtonComponent } from './components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { PointFormComponent } from './components/manual-entries-form/components/point-form/point-form.component';
import { PolygonFormComponent } from './components/manual-entries-form/components/polygon-form/polygon-form.component';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbCollapseModule
  ],
  declarations: [
    ModalComponent,
    FileUploadComponent,
    FileExportComponent,
    ManualEntriesFormComponent,
    IconComponent,
    ButtonComponent,
    LinesFormComponent,
    PointFormComponent,
    PolygonFormComponent
  ],
  exports: [
    ModalComponent,
    FileUploadComponent,
    FileExportComponent,
    ManualEntriesFormComponent,
    IconComponent,
    ButtonComponent,
    LinesFormComponent
  ]
})
export class SharedModule { }
