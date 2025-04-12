import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorService } from '../../services/professor.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseDialogComponent } from '../../courses/course-dialog/course-dialog.component';
import { Professor, ProfessorPipeline } from '../../models/professor';

@Component({
  selector: 'app-professor-dialog',
  standalone: false,
  templateUrl: './professor-dialog.component.html',
  styleUrl: './professor-dialog.component.css',
})
export class ProfessorDialogComponent {
  public saveProfessorForm: FormGroup;
  public isEditMode: boolean;

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
    @Inject(MAT_DIALOG_DATA) public professorToEdit: Professor | null
  ) {
    this.isEditMode = professorToEdit ? true : false;

    this.saveProfessorForm = this.fb.group({
      name: [
        professorToEdit?.name || '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],

      dpi: [
        professorToEdit?.dpi || '',
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
        ],
      ],
      entry_time: [professorToEdit?.entry_time || '', [Validators.required]],
      exit_time: [professorToEdit?.exit_time || '', [Validators.required]],
    });
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
      professorFormValue.dpi,
      this.formatTimeToString(new Date(professorFormValue.entry_time)),
      this.formatTimeToString(new Date(professorFormValue.exit_time))
    );

    const professorToSave: ProfessorPipeline = this.saveProfessorForm.value;
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

  public closeDialog() {
    this.dialogRef.close();
  }
}
