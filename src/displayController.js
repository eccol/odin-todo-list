export default class DisplayController {
  constructor() {
    this.projectsContainer = document.querySelector('.projects-container');
  }

  printProject(project) {
    const container = this.createElement('div');
    container.classList.add('project-container');
    const heading = this.createElement('h1', project.title);

    container.appendChild(heading);
    this.projectsContainer.appendChild(container);

    for (let todo of project.todoItems) {
      const todoElement = this.createTodoElement(todo);
      container.appendChild(todoElement);
    }
  }

  createTodoElement(todo) {
    const container = this.createElement('div');
    container.classList.add('todo-container');
    const heading = this.createElement('h2', todo.title);
    const body = this.createElement('p', todo.description);

    container.appendChild(heading);
    container.appendChild(body);
    return container;
  }

  createElement(type, content) {
    const element = document.createElement(type);
    if (content) { element.innerText = content };
    return element;
  }
}