import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  reactiveForm: FormGroup;
  statusValues = ['Stable', 'Critical', 'Finished'];
  forbiddenProjectName = 'Test';

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required], this.asyncProjectNameValidator),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl(this.statusValues[1])
    });
  }

  onSubmit() {
    console.log(this.reactiveForm.value);
    this.reactiveForm.reset();
  }

  // Synchronous custom validator
  projectNameValidator = (control: FormControl): { [s: string]: boolean } => {
    if (control.value === this.forbiddenProjectName) {
      return { 'forbiddenName': true };
    }
    return null;
  }

  // Asynchronous custom validator
  asyncProjectNameValidator = (control: FormControl): Promise<any> | Observable<any> => {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === this.forbiddenProjectName) {
          resolve({ 'forbiddenName': true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return promise;
  }
}


