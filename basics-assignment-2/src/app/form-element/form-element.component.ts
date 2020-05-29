import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.css']
})
export class FormElementComponent implements OnInit {
  username = '';

  constructor() { }

  ngOnInit(): void {
  }

  resetUsername() {
    this.username = '';
  }
}
