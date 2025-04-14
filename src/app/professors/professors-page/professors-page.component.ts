import { Component, OnInit } from '@angular/core';
import { Professor } from '../../models/professor';
import { ProfessorService } from '../../services/professor.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfessorDialogComponent } from '../professor-dialog/professor-dialog.component';
import { CsvDialogComponent } from '../../csv/csv-dialog/csv-dialog.component';

@Component({
  selector: 'app-professors-page',
  standalone: false,
  templateUrl: './professors-page.component.html',
  styleUrl: './professors-page.component.css',
})
export class ProfessorsPageComponent implements OnInit {
  public professors: Professor[] = [];

  public displayedColumns: string[] = [
    'id',
    'name',
    'personal_id',
    'entry_time',
    'exit_time',
    'actions',
  ];

  constructor(
    private professorService: ProfessorService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getAllProfessors();
  }

  public onCreateProfessor(): void {
    //abrimos el dialog de creacion del docente, sin info para que no active el modo edicion
    const dialogRef = this.dialog.open(ProfessorDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllProfessors();
    });
  }

  /**
   * Abre un dialogo, le envia un Professor para que el el dialogo sepa que debe enviarlo a editar
   * @param professor Objeto que contiene la informacion del docente a editar
   */
  public onEditProfessor(professor: Professor): void {
    //abrimos el dialog de edicion del docente, con informacion para que se iniciae el  modo edicion
    const dialogRef = this.dialog.open(ProfessorDialogComponent, {
      width: '400px',
      data: professor,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllProfessors();
    });
  }

  public onOpenCsvProfessor(): void {
    //abrimos el dialog de carga csv con 1 para que sepa a donde mandar la peticion
    const dialogRef = this.dialog.open(CsvDialogComponent, {
      width: '400px',
      data: 1,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllProfessors();
    });
  }

  public onOpenCsvAssgiment(): void {
    //abrimos el dialog de carga csv con 1 para que sepa a donde mandar la peticion
    const dialogRef = this.dialog.open(CsvDialogComponent, {
      width: '400px',
      data: 3,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllProfessors();
    });
  }

  /**
   * Utiliza el servcio para mandar a traer todos los docentes del backend
   */
  private getAllProfessors(): void {
    this.professorService.getAllProfessors().subscribe((response) => {
      this.professors = response;
    });
  }
}
