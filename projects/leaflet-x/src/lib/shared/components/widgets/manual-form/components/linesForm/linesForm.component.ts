import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-linesForm',
  templateUrl: './linesForm.component.html',
  styleUrls: ['./linesForm.component.sass']
})
export class LinesFormComponent implements OnInit {

  isLineFormCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
