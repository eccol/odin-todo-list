export default class TodoItem {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
  }

  toggleComplete() {
    this.complete = !this.complete;
  }
}

export function createTodoItem(title, description, dueDate, priority) {
  return new TodoItem(title, description, dueDate, priority);
}