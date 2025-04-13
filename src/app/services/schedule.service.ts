import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule, SchedulePipeline } from '../models/schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private apiUrl = 'http://localhost:8000/schedule/';

  constructor(private http: HttpClient) {}

  /**
   * Trae del back el horario
   */
  public getSchedule(schedule: SchedulePipeline): Observable<Schedule> {
    return this.http.post<Schedule>(this.apiUrl, schedule);
  }

  // public getSchedule(schedule: SchedulePipeline): Observable<Blob> {
  //   return this.http.post(this.apiUrl, schedule, {
  //     responseType: 'blob',
  //   });
  // }
}
