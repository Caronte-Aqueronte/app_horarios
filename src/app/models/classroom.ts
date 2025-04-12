export class Classroom {
  public id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class ClassroomPipeline extends Classroom {
  constructor(name: string, id: number) {
    super(id, name);
  }
}
