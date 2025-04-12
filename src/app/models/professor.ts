import { Course } from './course';

class ProfessorBase {
  public name: string;
  public dpi: string;
  public entry_time: string;
  public exit_time: string;

  constructor(
    name: string,
    dpi: string,
    entry_time: string,
    exit_time: string
  ) {
    this.name = name;
    this.dpi = dpi;
    this.entry_time = entry_time;
    this.exit_time = exit_time;
  }
}

export class ProfessorPipeline extends ProfessorBase {
  public courses_ids: number[];

  constructor(
    name: string,
    dpi: string,
    entry_time: string,
    exit_time: string,
    courses_ids: number[]
  ) {
    super(name, dpi, entry_time, exit_time);
    this.courses_ids = courses_ids;
  }
}

export class Professor extends ProfessorBase {
  public id: number;
  public courses: Course[];
  constructor(
    id: number,
    name: string,
    dpi: string,
    entry_time: string,
    exit_time: string,
    courses: Course[]
  ) {
    super(name, dpi, entry_time, exit_time);
    this.id = id;
    this.courses = courses;
  }
}
