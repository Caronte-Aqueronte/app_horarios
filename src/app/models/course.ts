import { CourseTypeEnum } from './course-type.enum';
import { Professor } from './professor';

class CourseBase {
  public name: string;
  public code: string;
  public career: string;
  public semester: number;
  public section: string;
  public type: CourseTypeEnum;

  constructor(
    name: string,
    code: string,
    career: string,
    semester: number,
    section: string,
    type: CourseTypeEnum
  ) {
    this.name = name;
    this.code = code;
    this.career = career;
    this.semester = semester;
    this.section = section;
    this.type = type;
  }
}
export class CoursePipeline extends CourseBase {
  public professor_id: number;

  constructor(
    professor_id: number,
    name: string,
    code: string,
    career: string,
    semester: number,
    section: string,
    type: CourseTypeEnum
  ) {
    super(name, code, career, semester, section, type);
    this.professor_id = professor_id;
  }
}

export class Course extends CourseBase {
  public id: number;
  public professor: Professor;

  constructor(
    id: number,
    name: string,
    code: string,
    career: string,
    semester: number,
    section: string,
    type: CourseTypeEnum,
    professor: Professor
  ) {
    super(name, code, career, semester, section, type);
    this.id = id;
    this.professor = professor;
  }
}
