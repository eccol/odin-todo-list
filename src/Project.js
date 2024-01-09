export default class Project {
  static count = 0;

  constructor(title) {
    this.title = title;
    this.tasks = [];
    this.id = Project.count;
    Project.count += 1;
  }

  addTask(newTask) {
    this.tasks.push(newTask);
  }

  get percentCompleted() {
    let completeCount = 0;
    const totalCount = this.tasks.length;
    for (let t of this.tasks) {
      if (t.complete) { completeCount++ };
    }
    // Rounding to 1 decimal
    return Math.round(completeCount / totalCount * 1000) / 10;
  }
}

export function createProject(title) {
  return new Project(title);
}