export default class Task {
  static id = 0;

  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
    this.id = Task.id;
    Task.id = Task.id += 1;
  }

  toggleComplete() {
    this.complete = !this.complete;
  }
}

export function createTask(title, description, dueDate, priority) {
  return new Task(title, description, dueDate, priority);
}