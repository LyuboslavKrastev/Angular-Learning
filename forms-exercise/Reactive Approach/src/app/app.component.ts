import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenNames = ['Pesho', 'Stamat'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.checkForbiddenNames]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.checkForbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe((value) => console.log(value));
    this.signupForm.statusChanges.subscribe((status) => console.log(status));
    this.signupForm.setValue({
      'userData': {
        'username': 'NotPesho',
        'email': 'email@address'
      },
      'gender': 'male',
      'hobbies': []
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  // Synchronous custom validator
  // we want to have a KVP, where the key can be interpreted as a string
  checkForbiddenNames = (control: FormControl): { [s: string]: boolean } => {
    if (this.forbiddenNames.indexOf(control.value) > -1) { // -1 === not found.
      return { 'forbiddenUsername': true };
    }
    return null; // if validation is successful, you have to pass nothing or null
  }


  // Asynchronous custom validator
  checkForbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'pesho@stamat.com') {
          resolve({ 'forbiddenEmail': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
