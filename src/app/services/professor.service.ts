import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor, ProfessorPipeline } from '../models/professor';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  private apiUrl = 'http://localhost:8000/professors/';

  constructor(private http: HttpClient) {}

  /**
   * Trae del back la lista completa de docentes
   */
  public getAllProfessors(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.apiUrl);
  }

  /**
   * Trae del back un profesor en base a su id
   */
  public getProfessorById(id: string): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.apiUrl + id}`);
  }

  /**
   * Manda a crear un nuevo docente al backend
   * @param professor Objeto con los datos del docente a crear
   */
  public createProfessor(professor: ProfessorPipeline): Observable<Professor> {
    return this.http.post<Professor>(this.apiUrl, professor);
  }

  /**
   * Manda a editar un docente al backend
   * @param professor Objeto con los datos del docente a editar
   */
  public editProfessor(
    id: number,
    professor: ProfessorPipeline
  ): Observable<Professor> {
    return this.http.patch<Professor>(`${this.apiUrl + id}`, professor);
  }
}
