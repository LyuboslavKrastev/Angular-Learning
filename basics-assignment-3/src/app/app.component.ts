import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showParagraph = false;
  clickLogger = [];

  toggleParagraph() {
    this.showParagraph = !this.showParagraph;
    this.logClick();
  }
  logClick() {
    this.clickLogger.push(Date.now());
  }

}
