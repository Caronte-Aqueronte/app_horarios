import { Component, Input, OnInit } from '@angular/core';
import { Assignment, Schedule, ScheduleRow } from '../../models/schedule';
import { ScheduleStoreService } from '../../services/schedule-store.service';
import { ScheduleService } from '../../services/schedule.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-generated-schedule',
  standalone: false,
  templateUrl: './generated-schedule.component.html',
  styleUrl: './generated-schedule.component.css',
})
export class GeneratedScheduleComponent implements OnInit {
  public schedule!: Schedule;

  public displayedColumns: string[] = [];

  public assignments: ScheduleRow[] = [];

  constructor(
    private scheduleStoreService: ScheduleStoreService,
    private scheduleService: ScheduleService,
    private toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    this.schedule = this.scheduleStoreService.getSchedule();

    if (!this.schedule) {
      this.toastr.error(
        'No se ha generado ningún horario. Por favor, intente nuevamente.',
        'Error'
      );
      return; //si no viene nada entonces no podemos iniciar el horario
    }

    this.displayedColumns = ['time_range', ...this.getColumnsIds()];

    // El dataSource son simplemente las filas del horario
    this.assignments = this.schedule.rows;
  }

  public onExportSchedule() {
    if (!this.schedule) {
      this.toastr.error(
        'No se ha generado ningún horario, por lo tanto no se puede exportar a PDF.',
        'Exportación fallida'
      );
      return; //si no viene nada entonces no podemos iniciar el horario
    }

    this.scheduleService.exportSchedule(this.schedule).subscribe({
      next: (pdf: Blob) => {
        const blobUrl = URL.createObjectURL(pdf);
        window.open(blobUrl);
      },
      error: (error: Error) => {},
    });
  }

  /**
   * Por cada una  de las clases presetenes en el objeto (columnas), entonces vamos creando los
   * ids que usada Angular Material para indentidicar cada col
   * @returns
   */
  private getColumnsIds(): string[] {
    var ids: string[] = [];
    for (let x = 0; x < this.schedule.classrooms.length; x++) {
      ids.push('classroom' + x);
    }
    return ids;
  }
}
