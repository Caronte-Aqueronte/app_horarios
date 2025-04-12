import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom, ClassroomPipeline } from '../models/classroom';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  private apiUrl = 'http://localhost:8000/classrooms/';

  constructor(private http: HttpClient) {}

  /**
   * Trae del back la lista completa de salones
   */
  public getAllClassrooms(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.apiUrl);
  }

  /**
   * Trae del back un salon en base a su id
   */
  public getClassroomById(id: string): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(`${this.apiUrl + id}`);
  }

  /**
   * Manda a crear un nuevo salon al backend
   * @param classroom Objeto con los datos del salon a crear
   */
  public createClassroom(classroom: ClassroomPipeline): Observable<Classroom> {
    return this.http.post<Classroom>(this.apiUrl, classroom);
  }

  /**
   * Manda a editar un salon al backend
   * @param professor Objeto con los datos del salon a editar
   */
  public editClassroom(
    id: number,
    professor: ClassroomPipeline
  ): Observable<Classroom> {
    return this.http.patch<Classroom>(`${this.apiUrl + id}`, professor);
  }
}
