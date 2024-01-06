class Project {
  constructor(title) {
    this.title = title;
    this.todoItems = [];
  }

  addTodo(todo) {
    this.todoItems.push(todo);
  }
}

export function createProject(title) {
  return new Project(title);
}