export class ProfessorPipeline {
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

export class Professor extends ProfessorPipeline {

  public id: number;

  constructor(
    id: number,
    name: string,
    dpi: string,
    entry_time: string,
    exit_time: string
  ) {
    super(name, dpi, entry_time, exit_time);
    this.id = id;
  }
}
