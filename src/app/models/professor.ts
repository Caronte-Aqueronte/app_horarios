import { Course } from './course';

class ProfessorBase {
  public name: string;
  public personal_id: string;
  public entry_time: string;
  public exit_time: string;

  constructor(
    name: string,
    personal_id: string,
    entry_time: string,
    exit_time: string
  ) {
    this.name = name;
    this.personal_id = personal_id;
    this.entry_time = entry_time;
    this.exit_time = exit_time;
  }
}

export class ProfessorPipeline extends ProfessorBase {
  public courses_ids: number[];

  constructor(
    name: string,
    personal_id: string,
    entry_time: string,
    exit_time: string,
    courses_ids: number[]
  ) {
    super(name, personal_id, entry_time, exit_time);
    this.courses_ids = courses_ids;
  }
}

export class Professor extends ProfessorBase {
  public id: number;
  public courses: Course[];
  constructor(
    id: number,
    name: string,
    personal_id: string,
    entry_time: string,
    exit_time: string,
    courses: Course[]
  ) {
    super(name, personal_id, entry_time, exit_time);
    this.id = id;
    this.courses = courses;
  }
}
