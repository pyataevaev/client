import {Faculty} from './faculty.model';
export class Group {
  public id?: any;
  public name?: string;
  public faculty?: Faculty;

  constructor(
    id?: any,
    name?: string,
    faculty?: Faculty,
  ) {
    this.id = id ? id : null;
    this.name = name ? name : null;
    this.faculty = faculty ? faculty : null;
  }
}
