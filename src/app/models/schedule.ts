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
  public total_iterations: number;
  public history_confilcts: Record<string, number>;
  public history_fitness: Record<string, number>;
  public memory_usage: number;
  public total_time: number;
  public semester_continuity_percentages: Record<string, number>;

  public classrooms: Classroom[];
  public rows: ScheduleRow[];

  constructor(
    total_iterations: number,
    history_conflicts: Record<string, number>,
    history_fitness: Record<string, number>,
    memory_usage: number,
    total_time: number,
    semester_continuity_percentages: Record<string, number>,
    classrooms: Classroom[],
    rows: ScheduleRow[]
  ) {
    this.total_iterations = total_iterations;
    this.history_confilcts = history_conflicts;
    this.history_fitness = history_fitness;
    this.memory_usage = memory_usage;
    this.total_time = total_time;
    this.semester_continuity_percentages = semester_continuity_percentages;
    this.classrooms = classrooms;
    this.rows = rows;
  }
}

export class SchedulePipeline {
  public population_size: number;
  public max_generations: number;
  public target_fitness: number;
  public courses_availables_ids: number[];
  public professors_availables_ids: number[];
  public manual_course_classrooms_assignments: Record<number, number>;
  public selection_type: number;

  constructor(
    $population_size: number,
    $max_generations: number,
    $target_fitness: number,
    $courses_availables_ids: number[],
    $professors_availables_ids: number[],
    $manual_course_classrooms_assignments: Record<number, number>,
    $selection_type: number
  ) {
    this.population_size = $population_size;
    this.max_generations = $max_generations;
    this.target_fitness = $target_fitness;
    this.courses_availables_ids = $courses_availables_ids;
    this.professors_availables_ids = $professors_availables_ids;
    this.manual_course_classrooms_assignments =
      $manual_course_classrooms_assignments;
    this.selection_type = $selection_type;
  }
}
