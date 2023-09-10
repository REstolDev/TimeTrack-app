class project {
  constructor(name, date, totalTime) {
    this.name = String(name);
    this.date = new Date(date);
    this.totalTime = Number(totalTime);
  }

  startedTime() {
    const startedDate = new Date(this.date - this.totalTime);
    return startedDate.toLocaleTimeString();
  }

  finishedTime() {
    return this.date.toLocaleTimeString();
  }
}
