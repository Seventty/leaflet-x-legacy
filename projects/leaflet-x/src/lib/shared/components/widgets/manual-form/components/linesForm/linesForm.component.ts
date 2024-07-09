import { Component, OnInit } from '@angular/core';
import { FormService } from 'projects/leaflet-x/src/lib/shared/services/form/form.service';

@Component({
  selector: 'app-linesForm',
  templateUrl: './linesForm.component.html',
  styleUrls: ['./linesForm.component.sass']
})
export class LinesFormComponent implements OnInit {

  constructor(private formService: FormService) { }

  ngOnInit() {
    //TEST
    this.formService.valueChange.subscribe(c => {
      console.log(c);
    })
  }

}
