import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
  classicArr = [1,2,3,4,5,6,7,8,9,10];
  silverArr = [1,2,3,4,5,6,7,8,9,10]
  constructor() { }

  ngOnInit(): void {
  }

}
