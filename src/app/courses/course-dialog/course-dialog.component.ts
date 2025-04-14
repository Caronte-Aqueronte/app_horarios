import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course, CoursePipeline } from '../../models/course';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from '../../services/course.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProfessorService } from '../../services/professor.service';
import { Professor } from '../../models/professor';
import {
  CourseTypeEnum,
  CourseTypeLabels,
} from '../../models/course-type.enum';

@Component({
  selector: 'app-course-dialog',
  standalone: false,
  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.css',
})
export class CourseDialogComponent  {
  public saveCourseForm: FormGroup;
  public isEditMode: boolean;

  public professors!: Professor[];
  public courseTypes = Object.values(CourseTypeEnum);
  public courseTypeLabels = CourseTypeLabels;
  /**
   *
   * @param fb
   * @param dialogRef
   * @param courseToEdit es el curso que se va a esitar
   */
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private courseService: CourseService,
    private toastr: ToastrService,
    private professorService: ProfessorService,
    @Inject(MAT_DIALOG_DATA) public courseToEdit: Course | null
  ) {
    this.isEditMode = courseToEdit ? true : false;

    this.saveCourseForm = this.fb.group({
      name: [
        courseToEdit?.name || '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      code: [
        courseToEdit?.code || '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
      career: [
        courseToEdit?.career || '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      semester: [
        courseToEdit?.semester || null,
        [Validators.required, Validators.min(1)],
      ],
      section: [
        courseToEdit?.section || '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
        ],
      ],
      type: [
        courseToEdit?.type || CourseTypeEnum.MANDATORY,
        Validators.required,
      ]
    });
  }


  public save(): void {
    //si el formulario no esta completo lanzamos error
    if (!this.saveCourseForm.valid) {
      this.toastr.error(
        'Por favor, completá todos los campos requeridos.',
        'Formulario inválido'
      );
      return;
    }
    //obtenemos la informacion del formulario
    const courseToSave: CoursePipeline = this.saveCourseForm.value;
    this.isEditMode
      ? this.editCourse(courseToSave)
      : this.crateCourse(courseToSave);
  }

  private crateCourse(course: CoursePipeline): void {
    console.log(course);

    //mandmaos a crear el curso
    this.courseService.createCourse(course).subscribe({
      next: () => {
        this.toastr.success('Curso creado exitosamente', 'Éxito');
        this.closeDialog();
      },
      error: (error: Error) => {
        console.log(error);

        this.toastr.error(error.message, 'Error');
      },
    });
  }

  private editCourse(course: CoursePipeline): void {
    //si no se tiene la info a editar entonces se trata de un error
    if (!this.courseToEdit || !this.courseToEdit.id) {
      this.toastr.error(
        'No se encontró un curso válido para editar.',
        'Operación cancelada'
      );
      this.closeDialog();
      return;
    }

    //si lllego hasta aqui entonces solo debemos mandar a editar el curs
    this.courseService.editCourse(this.courseToEdit.id, course).subscribe({
      next: () => {
        this.toastr.success('Curso editado exitosamente', 'Éxito');
        this.closeDialog();
      },
      error: (error: Error) => {
        this.toastr.error(error.message, 'Error');
      },
    });
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
