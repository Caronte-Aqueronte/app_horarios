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

  /**
   * Manda a exportar un horario ya generado a pdf
   * @param schedule
   * @returns
   */
  public exportSchedule(schedule: Schedule): Observable<Blob> {
    return this.http.post(`${this.apiUrl}export`, schedule, {
      responseType: 'blob',
    });
  }
}
