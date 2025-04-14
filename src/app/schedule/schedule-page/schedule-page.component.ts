import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ProfessorService } from '../../services/professor.service';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../../models/course';
import { Professor } from '../../models/professor';
import { Classroom } from '../../models/classroom';
import { ClassroomService } from '../../services/classroom.service';
import { ScheduleService } from '../../services/schedule.service';
import { Schedule, SchedulePipeline } from '../../models/schedule';
import { ScheduleStoreService } from '../../services/schedule-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-page',
  standalone: false,
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.css',
})
export class SchedulePageComponent implements OnInit {
  public population_size: number = NaN;
  public max_generations: number = NaN;
  public target_fitness: number = NaN;

  public courses: Course[] = [];
  public professors: Professor[] = [];
  public classrooms: Classroom[] = [];

  public selectedCourses: Course[] = [];
  public selectedCoursesIds: number[] = [];
  public selectedProfessorsIds: number[] = [];
  public selectedClassroomCourses: Record<number, number> = {};
  public selectionType = '1';

  constructor(
    private toastr: ToastrService,
    private professorService: ProfessorService,
    private courseService: CourseService,
    private classroomService: ClassroomService,
    private scheduleService: ScheduleService,
    private scheduleStoreService: ScheduleStoreService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.getAllCourses();
    this.getAllProfessors();
    this.getAllClassrooms();
  }

  public onGenerateSchedule(): void {
    //validar que toda la info esta bien ingresada
    if (!this.population_size || !this.max_generations) {
      this.toastr.error(
        'Por favor, completá todos los parámetros con valores mayores a cero.',
        'Parámetros inválidos'
      );
      return;
    }

    if (this.target_fitness < 0) {
      this.toastr.error(
        'El valor de "Fitness objetivo" debe ser mayor a cero.',
        'Parámetro inválido'
      );
      return;
    }

    const schedule: SchedulePipeline = new SchedulePipeline(
      this.population_size,
      this.max_generations,
      this.target_fitness,
      this.selectedCoursesIds,
      this.selectedProfessorsIds,
      this.selectedClassroomCourses,
      Number(this.selectionType)
    );

    //si llego aqui todo bien podemos mandar la consulta
    this.scheduleService.getSchedule(schedule).subscribe({
      next: (response: Schedule) => {
        //seteamos el schedule obtenido ene el servicio para que el otro componente pueda obtenerlo
        console.log(response);

        this.scheduleStoreService.setSchedule(response);
        this.router.navigate(['/generated-schedule']);
      },
      error: (error: Error) => {
        this.toastr.error(error.message, 'Error');
      },
    });
  }

  private getAllProfessors(): void {
    this.professorService.getAllProfessors().subscribe((response) => {
      this.professors = response;
    });
  }

  private getAllCourses(): void {
    this.courseService.getAllCourses().subscribe((response) => {
      this.courses = response;
    });
  }

  private getAllClassrooms(): void {
    this.classroomService.getAllClassrooms().subscribe((response) => {
      this.classrooms = response;
    });
  }

  public onCheckboxCourseChange(course: Course): void {
    //si lo incluye es pouqe esta seleccionado y debemos eliminarlo de la lista librando la lista con todos aquellos
    //elementos que no sean el id
    if (this.selectedCoursesIds.includes(course.id)) {
      this.selectedCoursesIds = this.selectedCoursesIds.filter((existingId) => {
        return existingId !== course.id;
      });

      //tambien eliminamos el curso de la lista que guarda el objeto
      this.selectedCourses = this.selectedCourses.filter((existingId) => {
        return existingId.id !== course.id;
      });
      return;
    }
    this.selectedCoursesIds.push(course.id);
    this.selectedCourses.push(course);
  }

  public onCheckboxProfessorChange(id: number): void {
    //si lo incluye es pouqe esta seleccionado y debemos eliminarlo de la lista librando la lista con todos aquellos
    //elementos que no sean el id
    if (this.selectedProfessorsIds.includes(id)) {
      this.selectedProfessorsIds = this.selectedProfessorsIds.filter(
        (existingId) => {
          return existingId !== id;
        }
      );
      return;
    }
    this.selectedProfessorsIds.push(id);
  }
}
