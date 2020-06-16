import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  defaultSub = 'advanced';
  submitted = false;
  user = {
    email: '',
    subscription: '',
    password: '',
  };

  onSubmit(form: NgForm) {
    console.log(form.value)
    this.user.email = form.value.email;
    this.user.subscription = form.value.subscription;
    this.user.password = form.value.password;

    this.submitted = true;
    form.reset();
  }
}
