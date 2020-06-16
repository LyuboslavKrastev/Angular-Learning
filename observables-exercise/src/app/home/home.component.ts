import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private observerSub: Subscription;
  constructor() { }

  ngOnInit() {
    // this.observerSub = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;

      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 2) {
          observer.error(new Error('Count is greater than 2!'));
        }
        count++;
      }, 1000);
    });



    this.observerSub = customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      return `Round: ${data + 1}`;
    })).subscribe(data => {
      console.log(data);
    }, error => { // an error cancels an observable, it does not complete it
      alert(error.message);
    }, () => { // completion handler func
      console.log('Job\'s done!');
    });
  }
  ngOnDestroy() {
    this.observerSub.unsubscribe(); // prevent a memory leak
  }
}
