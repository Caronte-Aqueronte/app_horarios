export enum CourseTypeEnum {
  MANDATORY = 'mandatory',
  ELECTIVE = 'elective',
}

//representa un mapa en dnde los valores del enum son las llaves y el valor seria la traduccio
export const CourseTypeLabels: Record<string, string> = {
  [CourseTypeEnum.MANDATORY]: 'Obligatorio',
  [CourseTypeEnum.ELECTIVE]: 'Opcional',
};
