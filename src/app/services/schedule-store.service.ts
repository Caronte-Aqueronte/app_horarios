import { Injectable } from '@angular/core';
import { Schedule } from '../models/schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleStoreService {
  private schedule!: Schedule;

  public setSchedule(schedule: Schedule): void {
    this.schedule = schedule;
  }

  public getSchedule(): Schedule {
    return this.schedule;
  }
}
