import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CourseTypeLabels } from '../../models/course-type.enum';
import { CsvDialogComponent } from '../../csv/csv-dialog/csv-dialog.component';

@Component({
  selector: 'app-courses-page',
  standalone: false,
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css',
})
export class CoursesPageComponent implements OnInit {
  public courses: Course[] = [];
  public courseTypeLables = CourseTypeLabels;

  public displayedColumns: string[] = [
    'name',
    'code',
    'career',
    'semester',
    'section',
    'type',
    'actions',
  ];

  constructor(
    private courseService: CourseService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  public onCreateCourse(): void {
    //abrimos el dialog de creacion del curso
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      width: '400px',
      data: null, //no le pasamos nada de data para que se ponga en modo creacion
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllCourses();
    });
  }
  public onEditCourse(course: Course): void {
    //abrimos el dialog de creacion del curso
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      width: '400px',
      data: course, //no le pasamos nada de data para que se ponga en modo creacion
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllCourses();
    });
  }

  public onOpenCsvCourse(): void {
    //abrimos el dialog de carga csv con 1 para que sepa a donde mandar la peticion
    const dialogRef = this.dialog.open(CsvDialogComponent, {
      width: '400px',
      data: 2,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllCourses();
    });
  }

  private getAllCourses(): void {
    this.courseService.getAllCourses().subscribe((response) => {
      this.courses = response;
    });
  }
}
