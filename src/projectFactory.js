class Project {
  constructor(title) {
    this.title = title;
    todoItems = [];
  }
}

export function createProject(title) {
  return new Project(title);
}