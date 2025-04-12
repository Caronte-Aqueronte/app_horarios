import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Classroom, ClassroomPipeline } from '../../models/classroom';
import { ToastrService } from 'ngx-toastr';
import { ClassroomService } from '../../services/classroom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-classroom-dialog',
  standalone: false,
  templateUrl: './classroom-dialog.component.html',
  styleUrl: './classroom-dialog.component.css',
})
export class ClassroomDialogComponent {
  public isEditMode: boolean;
  public saveClassroomForm: FormGroup;
  /**
   *
   * @param classroom
   * @param toastr
   * @param classroomService
   * @param fb
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public classroom: Classroom | null,
    private dialogRef: MatDialogRef<ClassroomDialogComponent>,
    private toastr: ToastrService,
    private classroomService: ClassroomService,
    private fb: FormBuilder
  ) {
    this.isEditMode = classroom ? true : false;
    this.saveClassroomForm = this.fb.group({
      name: [
        classroom?.name || '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(1),
        ],
      ],
    });
  }

  public onSave(): void {
    //si el form es invalido retonarmos el metodo
    if (!this.saveClassroomForm.valid) {
      this.toastr.error(
        'Por favor, completá todos los campos requeridos.',
        'Formulario inválido'
      );
      return;
    }

    //obtenemos la info del form
    const classroomToSave = this.saveClassroomForm.value;
    this.isEditMode
      ? this.editCourse(classroomToSave)
      : this.createClassroom(classroomToSave);
  }

  private createClassroom(classroom: ClassroomPipeline): void {
    //mandmaos a crear el salon
    this.classroomService.createClassroom(classroom).subscribe({
      next: () => {
        this.toastr.success('Salón creado exitosamente', 'Éxito');
        this.closeDialog();
      },
      error: (error: Error) => {
        this.toastr.error(error.message, 'Error');
      },
    });
  }

  private editCourse(classroom: ClassroomPipeline): void {
    //si no se tiene la info a editar entonces se trata de un error
    if (!this.classroom || !this.classroom.id) {
      this.toastr.error(
        'No se encontró un salón válido para editar.',
        'Operación cancelada'
      );
      this.closeDialog();
      return;
    }

    //si lllego hasta aqui entonces solo debemos mandar a editar el salon
    this.classroomService
      .editClassroom(this.classroom.id, classroom)
      .subscribe({
        next: () => {
          this.toastr.success('Salón editado exitosamente', 'Éxito');
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
