export default class Task {
  static id = 0;

  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this._dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
    this.id = Task.id;
    Task.id = Task.id += 1;
    this.collapsed = true;
  }

  toggleComplete() {
    this.complete = !this.complete;
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  get dueDate() {
    if (!this._dueDate) { return null; }
    return this._dueDate.toLocaleDateString();
  }

  set dueDate(dueDate) {
    this._dueDate = dueDate;
  }

  get overdue() {
    if (this._dueDate && !this.complete) {
      return this._dueDate < new Date();
    } else {
      return false;
    }
  }
}

export function createTask(title, description, dueDate, priority) {
  return new Task(title, description, dueDate, priority);
}