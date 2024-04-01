const enum Present {
  PRESENT,
  NOT_PRESENT,
}

type VisitsType = {
  [lesson: string]: Present;
};

interface GradesType {
  [workName: string]: number;
}

class Student {
  private _firstName: string;
  private _lastName: string;
  private _birthYear: number;
  private _grades: GradesType = {};
  private _visits: VisitsType[] = [];

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get birthYear(): number {
    return this._birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  setGrade(value: GradesType): void {
    this._grades = { ...this._grades, ...value };
  }

  setVisits(value: VisitsType[]): void {
    this._visits = [...this._visits, ...value];
  }

  getStudentPerformanceRating(): number {
    const gradeValues: number[] = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade: number =
      gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) /
      gradeValues.length;
    const attendancePercentage: number =
      (this._visits.filter((present) => present).length / this._visits.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}

const student = new Student("Bill", "Bob", 1920);
type S = typeof student;

const enum Statuses {
  STATUS_1,
  STATUS_2,
  STATUS_3,
}

class Group<A> {
  private _area: A | undefined;
  private _status: Statuses | undefined;
  private _id: string;

  private _students: S[] = [];

  directionName: string = "";
  levelName: string = "";

  constructor(directionName: string, levelName: string, id: string) {
    this.directionName = directionName;
    this.levelName = levelName;
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  get area(): A | undefined {
    return this._area;
  }

  get status(): Statuses | undefined {
    return this._status;
  }

  get students(): S[] {
    return this._students;
  }

  setStatus(value: Statuses): void {
    this._status = value;
  }

  showPerformance(): Student[] {
    const sortedStudents = this._students.sort(
      (a, b) =>
        b.getStudentPerformanceRating() - a.getStudentPerformanceRating()
    );
    return sortedStudents;
  }

  addStudent(value: S): void {
    this._students = [...this._students, value];
  }

  removeStudent(value: S): void {
    this._students = this._students.filter(
      (student) =>
        student.age !== value.age && student.fullName !== value.fullName
    );
  }
}

class Level<G extends Group<any>> {
  private _groups: G[] = [];
  private _name: string;
  private _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }

  get groups(): G[] {
    return this._groups;
  }

  addGroup(value: G): void {
    this._groups.push(value);
  }
  removeGroup(value: G): void {
    this._groups = this._groups.filter((group: G) => group.id !== value.id);
  }
}

class Area<L extends Level<any>> {
  private _levels: L[] = [];
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get levels(): L[] {
    return this._levels;
  }

  get name(): string {
    return this._name;
  }

  addLevel(level: L): void {
    this._levels.push(level);
  }

  removeLevel(level: L): void {
    this._levels = this._levels.filter((lvl) => {
      return lvl.name !== level.name;
    });
  }
}

const enum Courses {
  COURSE_1,
  COURSE_2,
  COURSE_3,
  COURSE_4,
  COURSE_5,
}

interface Lecturer {
  name: string;
  surname: string;
  position: string;
  company: string;
  experience: string;
  courses: Courses[];
  contacts: string;
}

class School<A extends Area<any>> {
  private _areas: A[] = [];
  private _lecturers: Lecturer[] = [];

  get areas(): A[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addArea(value: A): void {
    this._areas.push(value);
  }
  removeArea(value: A): void {
    this._areas = this._areas.filter((area) => {
      return area.name !== value.name;
    });
  }

  addLecturer(value: Lecturer): void {
    this._lecturers.push(value);
  }

  removeLecturer(value: Lecturer): void {
    this._lecturers = this._lecturers.filter((lecturer) => {
      return lecturer.name !== value.name && lecturer.surname !== value.surname;
    });
  }
}
