import { Subscription } from 'rxjs';
import { UserService } from './user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) { }

  userActivated = false;
  private activatedSub: Subscription;

  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe(hasActivated => {
      this.userActivated = hasActivated;
    });
  }

  ngOnDestroy() {
    this.activatedSub.unsubscribe();
  }
}
