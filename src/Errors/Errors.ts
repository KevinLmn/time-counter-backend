export class NotEnoughTimeError extends Error {
  public timeLeft: number;

  constructor(message: string, timeLeft: number) {
    super(message);
    this.timeLeft = timeLeft;
  }
}
