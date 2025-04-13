import { Component, Input, OnInit } from '@angular/core';
import { Assignment, Schedule, ScheduleRow } from '../../models/schedule';
import { ScheduleStoreService } from '../../services/schedule-store.service';

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

  constructor(private scheduleStoreService: ScheduleStoreService) {}

  public ngOnInit(): void {
    this.schedule = this.scheduleStoreService.getSchedule();

    if (!this.schedule) {
      return; //si no viene nada entonces no podemos iniciar el horario
    }

    this.displayedColumns = ['time_range', ...this.getColumnsIds()];

    // El dataSource son simplemente las filas del horario
    this.assignments = this.schedule.rows;
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
