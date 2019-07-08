export class IntervalAutoSendQueue {
  private queue = [];
  private timer;
  private isTimerRunning = false;

  constructor(public interval: number, public executeFunction) {}

  public push(newValue) {
    this.queue.push(newValue);

    if (!this.isTimerRunning) {
      this.isTimerRunning = true;
      this.shiftAndExecute();
      this.initTimer();
    }
  }

  private shiftAndExecute() {
    this.executeFunction(this.queue.shift());
  }

  private initTimer() {
    this.timer = setInterval(() => {
      if (this.queue === [] || this.queue.length === 0) {
        this.isTimerRunning = false;
        clearInterval(this.timer);
      } else {
        this.shiftAndExecute();
      }
    }, 500);
  }
}
