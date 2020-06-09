export class CounterService {
  setToActiveCounter = 0;
  setToInactiveCounter = 0;

  incrementSetToActiveCounter() {
    this.setToActiveCounter++;
    console.log('Times set to active: ' + this.setToActiveCounter);
  }
  incrementSetToInactiveCounter() {
    this.setToInactiveCounter++;
    console.log('Times set to inactive: ' + this.setToInactiveCounter);
  }
}
