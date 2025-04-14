import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../services/course.service';
import { ProfessorService } from '../../services/professor.service';
import { FormBuilder } from '@angular/forms';
import { CsvService } from '../../services/csv.service';

@Component({
  selector: 'app-csv-dialog',
  standalone: false,
  templateUrl: './csv-dialog.component.html',
  styleUrl: './csv-dialog.component.css',
})
export class CsvDialogComponent {
  public selectedFileName: string | null = null;
  public selectedFile: File | null = null;
  public warnings: string[] = [];
  public success: string[] = [];
  constructor(
    private dialogRef: MatDialogRef<CsvDialogComponent>,
    private courseService: CourseService,
    private toastr: ToastrService,
    private csvService: CsvService,
    private professorService: ProfessorService,
    @Inject(MAT_DIALOG_DATA) public importType: number
  ) {}

  public getDialogTitle(): string {
    switch (this.importType) {
      case 1:
        return 'Cargar Docentes desde CSV';
      case 2:
        return 'Cargar Cursos desde CSV';
      case 3:
        return 'Relacionar Cursos y Docentes desde CSV';
      case 4:
        return 'Cargar Salones desde CSV';
      default:
        return 'Importación CSV';
    }
  }

  public onFileSelected(event: Event): void {
    //traer el input que que contiene el archivo
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0]; //mandamos a traer el primer archivo contenido en el imput

    if (!file) {
      ///si el archivo no esiste anzamos error yaboratmos
      this.toastr.error('Debes seleccionar un archivo.', 'Error');
      return;
    }

    if (!file.name.endsWith('.csv')) {
      this.toastr.error('Solo se permiten archivos CSV.', 'Error');
      this.selectedFile = null;
      this.selectedFileName = null;
      return;
    }

    this.selectedFile = file;
    this.selectedFileName = file.name;
  }

  public save(): void {
    if (!this.selectedFile) {
      ///si el archivo no esiste anzamos error yaboratmos
      this.toastr.error('Debes seleccionar un archivo.', 'Error');
      return;
    }

    switch (this.importType) {
      case 1:
        this.chargeProfessorsFromCsv();
        break;
      case 2:
        this.chargeCoursesFromCsv();
        break;
      case 3:
        this.chargeAssigmentFromCsv();
        break;

      case 4:
        this.chargeClassroomsFromCsv();
        break;
      default:
        this.toastr.error('Opcion invalida.', 'Error');
        break;
    }
  }

  private chargeClassroomsFromCsv(): void {
    this.csvService.uploadClassroomCsv(this.selectedFile!).subscribe({
      next: (messages: any) => {
        this.warnings = messages.warnings;
        this.success = messages.success;
        if (this.warnings.length > 0) {
          this.toastr.warning('Procesado con advertencias', 'Cuidado');
        } else {
          this.toastr.success('Salones cargados exitosamente.', 'Éxito');
        }
      },
    });
  }

  private chargeProfessorsFromCsv(): void {
    this.csvService.uploadProfessorCsv(this.selectedFile!).subscribe({
      next: (messages: any) => {
        this.warnings = messages.warnings;
        this.success = messages.success;
        if (this.warnings.length > 0) {
          this.toastr.warning('Procesado con advertencias', 'Cuidado');
        } else {
          this.toastr.success('Docentes cargados exitosamente.', 'Éxito');
        }
      },
    });
  }

  private chargeCoursesFromCsv(): void {
    this.csvService.uploadCoursesCsv(this.selectedFile!).subscribe({
      next: (messages: any) => {
        this.warnings = messages.warnings;
        this.success = messages.success;
        if (this.warnings.length > 0) {
          this.toastr.warning('Procesado con advertencias', 'Cuidado');
        } else {
          this.toastr.success('Cursos cargados exitosamente.', 'Éxito');
        }
      },
    });
  }

  private chargeAssigmentFromCsv(): void {
    this.csvService.uploadAssigmentsCsv(this.selectedFile!).subscribe({
      next: (messages: any) => {
        this.warnings = messages.warnings;
        this.success = messages.success;
        if (this.warnings.length > 0) {
          this.toastr.warning('Procesado con advertencias', 'Cuidado');
        } else {
          this.toastr.success('Asignaciones cargados exitosamente.', 'Éxito');
        }
      },
    });
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
