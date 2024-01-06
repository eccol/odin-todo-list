export default class Project {
  static count = 0;

  constructor(title) {
    this.title = title;
    this.todoItems = [];
    this.id = Project.count;
    Project.count += 1;
  }

  addTodo(todo) {
    this.todoItems.push(todo);
  }
}

export function createProject(title) {
  return new Project(title);
}