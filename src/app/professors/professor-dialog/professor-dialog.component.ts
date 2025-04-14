import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorService } from '../../services/professor.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Professor, ProfessorPipeline } from '../../models/professor';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-professor-dialog',
  standalone: false,
  templateUrl: './professor-dialog.component.html',
  styleUrl: './professor-dialog.component.css',
})
export class ProfessorDialogComponent implements OnInit {
  public saveProfessorForm: FormGroup;
  public isEditMode: boolean;
  public selectedCoursesIds: number[] = [];
  public courses: Course[] = [];

  /**
   *
   * @param fb
   * @param dialogRef
   * @param professorToEdit e
   */
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProfessorDialogComponent>,
    private toastr: ToastrService,
    private professorService: ProfessorService,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public professorToEdit: Professor | null
  ) {
    this.isEditMode = professorToEdit ? true : false;
    this.loadProfessoCourses();
    this.saveProfessorForm = this.fb.group({
      name: [
        professorToEdit?.name || '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],

      personal_id: [
        professorToEdit?.personal_id || '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      entry_time: [professorToEdit?.entry_time || '', [Validators.required]],
      exit_time: [professorToEdit?.exit_time || '', [Validators.required]],
    });
  }

  public ngOnInit(): void {
    this.getAllCourses();
  }

  public save(): void {
    //si el formulario no esta completo lanzamos error
    if (!this.saveProfessorForm.valid) {
      this.toastr.error(
        'Por favor, completá todos los campos requeridos.',
        'Formulario inválido'
      );
      return;
    }
    //obtenemos la informacion del formulario
    const professorFormValue = this.saveProfessorForm.value;

    const professor: ProfessorPipeline = new ProfessorPipeline(
      professorFormValue.name,
      professorFormValue.personal_id,
      this.formatTimeToString(new Date(professorFormValue.entry_time)),
      this.formatTimeToString(new Date(professorFormValue.exit_time)),
      this.selectedCoursesIds
    );

    this.isEditMode
      ? this.editProfessor(professor)
      : this.createProfessor(professor);
  }

  private createProfessor(professor: ProfessorPipeline): void {
    //mandmaos a crear el curso
    this.professorService.createProfessor(professor).subscribe({
      next: () => {
        this.toastr.success('Docente creado exitosamente', 'Éxito');
        this.closeDialog();
      },
      error: (error: Error) => {
        this.toastr.error(error.message, 'Error');
      },
    });
  }

  private editProfessor(professor: ProfessorPipeline): void {
    //si no se tiene la info a editar entonces se trata de un error
    if (!this.professorToEdit || !this.professorToEdit.id) {
      this.toastr.error(
        'No se encontró un docente válido para editar.',
        'Operación cancelada'
      );
      this.closeDialog();
      return;
    }

    console.log(professor);

    //si lllego hasta aqui entonces solo debemos mandar a editar el docente
    this.professorService
      .editProfessor(this.professorToEdit.id, professor)
      .subscribe({
        next: () => {
          this.toastr.success('Docente editado exitosamente', 'Éxito');
          this.closeDialog();
        },
        error: (error: Error) => {
          this.toastr.error(error.message, 'Error');
        },
      });
  }

  private formatTimeToString(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  private getAllCourses(): void {
    this.courseService.getAllCourses().subscribe((response) => {
      this.courses = response;
    });
  }

  public onCheckboxChange(id: number): void {
    //si lo incluye es pouqe esta seleccionado y debemos eliminarlo de la lista librando la lista con todos aquellos
    //elementos que no sean el id
    if (this.selectedCoursesIds.includes(id)) {
      this.selectedCoursesIds = this.selectedCoursesIds.filter((existingId) => {
        return existingId !== id;
      });
      return;
    }
    this.selectedCoursesIds.push(id);
  }

  private loadProfessoCourses() {
    for (var course of this.professorToEdit?.courses || []) {
      this.selectedCoursesIds.push(course.id);
    }
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
