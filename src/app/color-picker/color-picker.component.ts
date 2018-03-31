import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {
  showPicker: boolean;

  constructor() { }

  ngOnInit() {
    this.showPicker = false;
  }

  showColorPicker(show: boolean) {
    this.showPicker = show;
  }

}
