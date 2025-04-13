import { Classroom } from './classroom';
import { Course } from './course';

export class Assignment {
  public course: Course | null;
  public professor_name: string | null;
  public professor_dpi: string | null;
  public is_empty: boolean;

  constructor(
    $course: Course | null,
    $professor_name: string | null,
    $professor_dpi: string | null,
    $is_empty: boolean = false
  ) {
    this.course = $course;
    this.professor_name = $professor_name;
    this.professor_dpi = $professor_dpi;
    this.is_empty = $is_empty;
  }
}

export class ScheduleRow {
  public period: number;
  public time_range: string;
  public assignments: Assignment[];

  constructor(
    $period: number,
    $time_range: string,
    $assignments: Assignment[]
  ) {
    this.period = $period;
    this.time_range = $time_range;
    this.assignments = $assignments;
  }
}

export class Schedule {
  public classrooms: Classroom[];
  public rows: ScheduleRow[];

  constructor($classrooms: Classroom[], $rows: ScheduleRow[]) {
    this.classrooms = $classrooms;
    this.rows = $rows;
  }
}

export class SchedulePipeline {
  public population_size: number;
  public max_generations: number;
  public target_fitness: number;
  public courses_availables_ids: number[];
  public professors_availables_ids: number[];
  public manual_course_classrooms_assignments: Record<number, number>;

  constructor(
    $population_size: number,
    $max_generations: number,
    $target_fitness: number,
    $courses_availables_ids: number[],
    $professors_availables_ids: number[],
    $manual_course_classrooms_assignments: Record<number, number>
  ) {
    this.population_size = $population_size;
    this.max_generations = $max_generations;
    this.target_fitness = $target_fitness;
    this.courses_availables_ids = $courses_availables_ids;
    this.professors_availables_ids = $professors_availables_ids;
    this.manual_course_classrooms_assignments =
      $manual_course_classrooms_assignments;
  }
}
