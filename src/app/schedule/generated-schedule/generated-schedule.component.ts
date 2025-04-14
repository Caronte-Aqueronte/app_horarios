import { Component, OnInit } from '@angular/core';
import { Schedule, ScheduleRow } from '../../models/schedule';
import { ScheduleStoreService } from '../../services/schedule-store.service';
import { ScheduleService } from '../../services/schedule.service';
import { ToastrService } from 'ngx-toastr';
import { ChartData, ChartOptions } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart } from 'chart.js';

Chart.register(zoomPlugin);

@Component({
  selector: 'app-generated-schedule',
  standalone: false,
  templateUrl: './generated-schedule.component.html',
  styleUrl: './generated-schedule.component.css',
})
export class GeneratedScheduleComponent implements OnInit {
  public fitnessChartLabels: string[] = [];

  public fitnessChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Evolución de la función de aptitud',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };


  public schedule!: Schedule;

  public displayedColumns: string[] = [];
  public assignments: ScheduleRow[] = [];

  public conflictDisplayedColumns: string[] = ['generation', 'conflicts'];
  public fitnessDisplayedColumns: string[] = ['generation', 'conflicts'];
  public continuityDisplayedColumns: string[] = ['semester', 'percentage'];

  public contuinityData: { semester: string; percentage: number }[] = [];
  public conflictData: { generation: string; conflicts: number }[] = [];
  public fitnessData: { generation: string; conflicts: number }[] = [];

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

    //mapeamos las entradas de del map de conflictos aobjetos
    this.conflictData = Object.entries(this.schedule.history_confilcts).map(
      ([generation, conflicts]) => ({
        generation: generation,
        conflicts: conflicts,
      })
    );

    this.fitnessData = Object.entries(this.schedule.history_fitness).map(
      ([generation, conflicts]) => ({
        generation: generation,
        conflicts: conflicts,
      })
    );

    this.contuinityData = Object.entries(
      this.schedule.semester_continuity_percentages
    ).map(([semester, percentage]) => ({
      semester: semester,
      percentage: percentage,
    }));

    //vamos a inicializar los datos de la grafica
    this.fitnessChartData.labels = Object.keys(this.schedule.history_fitness);
    this.fitnessChartData.datasets[0].data = Object.values(
      this.schedule.history_fitness
    );

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
