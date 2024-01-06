export default class DisplayController {
  printProject(project) {
    const container = this.createElement('div');
    const heading = this.createElement('h1', project.title);

    container.appendChild(heading);
    document.body.appendChild(container);

    for (let todo of project.todoItems) { this.printTodo(todo) };
  }

  printTodo(todo) {
    const container = this.createElement('div');
    const heading = this.createElement('h2', todo.title);
    const body = this.createElement('p', todo.description);

    container.appendChild(heading);
    container.appendChild(body);
    document.body.appendChild(container);
  }

  createElement(type, content) {
    const element = document.createElement(type);
    if (content) { element.innerText = content };
    return element;
  }
}