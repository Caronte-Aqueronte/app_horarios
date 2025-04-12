import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CoursePipeline } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:8000/courses/';

  constructor(private http: HttpClient) {}

  /**
   * Trae del back la lista completa de cursos
   */
  public getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  /**
   * Trae del back un curso en base a su id
   */
  public getCourseById(id: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl + id}`);
  }

  /**
   * Manda a crear un nuevo curso al backend
   * @param course Objeto con los datos del curso a crear
   */
  public createCourse(course: CoursePipeline): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  /**
   * Manda a editar un curso al backend
   * @param course Objeto con los datos del curso a editar
   */
  public editCourse(id: number, course: CoursePipeline): Observable<Course> {
    return this.http.patch<Course>(`${this.apiUrl + id}`, course);
  }
}
