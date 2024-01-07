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
}

export function createProject(title) {
  return new Project(title);
}