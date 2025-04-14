import { Course } from './course';

class ProfessorBase {
  public name: string;
  public personal_id: string;
  public entry_time: string;
  public exit_time: string;
  public entry_time_str: string;
  public exit_time_str: string;
  constructor(
    name: string,
    personal_id: string,
    entry_time: string,
    exit_time: string,
    entry_time_str: string,
    exit_time_str: string
  ) {
    this.name = name;
    this.personal_id = personal_id;
    this.entry_time = entry_time;
    this.exit_time = exit_time;
    this.entry_time_str = entry_time_str;
    this.exit_time_str = exit_time_str;
  }
}

export class ProfessorPipeline extends ProfessorBase {
  public courses_ids: number[];

  constructor(
    name: string,
    personal_id: string,
    entry_time: string,
    exit_time: string,
    courses_ids: number[],
    entry_time_str: string,
    exit_time_str: string
  ) {
    super(
      name,
      personal_id,
      entry_time,
      exit_time,
      entry_time_str,
      exit_time_str
    );
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
    courses: Course[],
    entry_time_str: string,
    exit_time_str: string
  ) {
    super(
      name,
      personal_id,
      entry_time,
      exit_time,
      entry_time_str,
      exit_time_str
    );
    this.id = id;
    this.courses = courses;
  }
}
