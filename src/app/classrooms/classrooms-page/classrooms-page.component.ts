import { Component, OnInit } from '@angular/core';
import { Classroom } from '../../models/classroom';
import { ClassroomService } from '../../services/classroom.service';
import { MatDialog } from '@angular/material/dialog';
import { ClassroomDialogComponent } from '../classroom-dialog/classroom-dialog.component';

@Component({
  selector: 'app-classrooms-page',
  standalone: false,
  templateUrl: './classrooms-page.component.html',
  styleUrl: './classrooms-page.component.css',
})
export class ClassroomsPageComponent implements OnInit {
  public classrooms: Classroom[] = [];

  public displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(
    private classroomService: ClassroomService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getAllClassrooms();
  }

  /**
   * Abre un dialog, no le manda informacion para que no se ponga en modo edicion
   */
  public onCreateClassroom(): void {
    const dialogRef = this.dialog.open(ClassroomDialogComponent, {
      width: '400px',
    });
    //al cerrarse el dialog recargamos los salones
    dialogRef.afterClosed().subscribe(() => {
      this.getAllClassrooms();
    });
  }

  /**
   * Abre un dialog, no le  informacion para que no se ponga en modo edicion
   */
  public onEditClassroom(classroom: Classroom): void {
    const dialogRef = this.dialog.open(ClassroomDialogComponent, {
      width: '400px',
      data: classroom,
    });
    //al cerrarse el dialog recargamos los salones
    dialogRef.afterClosed().subscribe(() => {
      this.getAllClassrooms();
    });
  }

  /**
   * MAnda a traer todos los salor por medio del servicio
   */
  private getAllClassrooms(): void {
    this.classroomService.getAllClassrooms().subscribe({
      next: (classrooms: Classroom[]) => {
        this.classrooms = classrooms;
      },
      error: (Error: Error) => {},
    });
  }
}
