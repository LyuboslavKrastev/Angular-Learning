export class LoggingService {
  logStatusChange(status: string) {
    console.log('A server status chaned, new status: ' + status);
  }
}
