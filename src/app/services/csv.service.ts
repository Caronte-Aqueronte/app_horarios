import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  private apiUrl = 'http://localhost:8000/csv/';

  constructor(private http: HttpClient) {}

  public uploadProfessorCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.apiUrl}professors`, formData);
  }

  public uploadCoursesCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.apiUrl}courses`, formData);
  }

  public uploadAssigmentsCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.apiUrl}assigments`, formData);
  }

  public uploadClassroomCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.apiUrl}classrooms`, formData);
  }
}
