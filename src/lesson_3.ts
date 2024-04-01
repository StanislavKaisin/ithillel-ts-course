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

  get getStudentFirstName(): string {
    return this._firstName;
  }

  get getStudentLastName(): string {
    return this._lastName;
  }

  get getStudentBirthYear(): number {
    return this._birthYear;
  }

  get getStudentFullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set setStudentFullName(value: string) {
    [this._lastName, this._firstName] = value.split(" ");
  }

  get getStudentAge(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  set setStudentGrade(value: GradesType) {
    this._grades = { ...this._grades, ...value };
  }

  set setStudentVisits(value: VisitsType[]) {
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

  showPerformance() {
    const sortedStudents = this._students.sort(
      (a, b) =>
        b.getStudentPerformanceRating() - a.getStudentPerformanceRating()
    );
    return sortedStudents;
  }

  set addStudent(value: S) {
    this._students = [...this._students, value];
  }

  set removeStudent(value: S) {
    this._students = this._students.filter(
      (student) =>
        student.getStudentAge !== value.getStudentAge &&
        student.getStudentFullName !== value.getStudentFullName &&
        student.getStudentAge != student.getStudentAge
    );
  }

  get getGroupId(): string {
    return this._id;
  }

  get getGroupArea(): A | undefined {
    return this._area;
  }

  set setGroupArea(value: A) {
    this._area = value;
  }

  get getGroupStatus(): Statuses | undefined {
    return this._status;
  }

  set setGroupStatus(value: Statuses) {
    this._status = value;
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

  get getLevelName(): string {
    return this._name;
  }
  get getLevelDescription(): string {
    return this._description;
  }

  get getLevelGroups(): G[] {
    return this._groups;
  }

  set addGroupToLevel(value: G) {
    this._groups.push(value);
  }
  set removeGroupFromLevel(value: G) {
    this._groups = this._groups.filter(
      (group: G) => group.getGroupId !== value.getGroupId
    );
  }
}

class Area<L extends Level<any>> {
  private _levels: L[] = [];
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get getAreaLevels(): L[] {
    return this._levels;
  }

  get getAreaName(): string {
    return this._name;
  }

  set addLevelToArea(level: L) {
    this._levels.push(level);
  }

  set removeLevelFromArea(level: L) {
    this._levels = this._levels.filter((lvl) => {
      return lvl.getLevelName !== level.getLevelName;
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

  get areas() {
    return this._areas;
  }

  get lecturers() {
    return this._lecturers;
  }

  set addAreaToSchool(value: A) {
    this._areas.push(value);
  }
  set removeAreaFromSchool(value: A) {
    this._areas = this._areas.filter((area) => {
      return area.getAreaName !== value.getAreaName;
    });
  }

  set addLecturerToSchool(value: Lecturer) {
    this._lecturers.push(value);
  }

  set removeLecturerFromSchool(value: Lecturer) {
    this._lecturers = this._lecturers.filter((lecturer) => {
      return lecturer.name !== value.name && lecturer.surname !== value.surname;
    });
  }
}
