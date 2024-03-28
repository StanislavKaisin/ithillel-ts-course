class School<T> {
  directions: T[] = [];

  addDirection(direction: T): void {
    this.directions.push(direction);
  }
}

class Direction<N, L> {
  private _name: N;
  levels: L[] = [];

  get name(): N {
    return this._name;
  }

  constructor(name: N) {
    this._name = name;
  }

  addLevel(level: L): void {
    this.levels.push(level);
  }
}

class Level<N, P, G> {
  groups: G[] = [];
  private _name: N;
  private _program: P;

  constructor(name: N, program: P) {
    this._name = name;
    this._program = program;
  }

  get name(): N {
    return this._name;
  }

  get program(): P {
    return this._program;
  }

  addGroup(group: G): void {
    this.groups.push(group);
  }
}

class Group<S extends Student<any>> {
  _students: S[] = [];
  directionName: string = "";
  levelName: string = "";

  get students(): S[] {
    return this._students;
  }

  constructor(directionName: string, levelName: string) {
    this.directionName = directionName;
    this.levelName = levelName;
  }

  addStudent(student: S): void {
    this._students.push(student);
  }

  showPerformance(): S[] {
    const sortedStudents = this._students.sort(
      (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
    );

    return sortedStudents;
  }
}

class Student<A> {
  grades: {
    [subject: string]: number;
  } = {};
  attendance: A[] = [];
  firstName: string = "";
  lastName: string = "";
  birthYear: number = NaN;

  constructor(firstName: string, lastName: string, birthYear: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
  }

  get fullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }

  set fullName(value) {
    [this.lastName, this.firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this.birthYear;
  }

  setGrade(subject: string, grade: number): void {
    this.grades[subject] = grade;
  }

  markAttendance(present: A): void {
    this.attendance.push(present);
  }

  getPerformanceRating(): number {
    const gradeValues = Object.values(this.grades);

    if (gradeValues.length === 0) return 0;

    const averageGrade =
      gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;

    const attendancePercentage =
      (this.attendance.filter((present) => present).length /
        this.attendance.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
