export default class DisplayController {
  constructor() {
    this.projectsContainer = document.querySelector('.projects-container');
  }

  update(projects) {
    this.projectsContainer.innerHTML = '';
    for (let project of projects) {
      this.printProject(project);
    }
  }

  printProject(project) {
    const container = this.createElementWithText('div');
    container.classList.add('project-container');
    const heading = this.createElementWithText('h1', project.title);

    container.appendChild(heading);
    this.projectsContainer.appendChild(container);

    for (let todo of project.todoItems) {
      const todoElement = this.createTodoElement(todo);
      container.appendChild(todoElement);
    }
  }

  createTodoElement(todo) {
    const container = this.createElementWithText('div');
    container.classList.add('todo-container');
    const heading = this.createElementWithText('h2', todo.title);
    const body = this.createElementWithText('p', todo.description);

    container.appendChild(heading);
    container.appendChild(body);
    return container;
  }

  createElementWithText(type, content) {
    const element = document.createElement(type);
    if (content) { element.innerText = content };
    return element;
  }
}