export default class DisplayController {
  constructor(projectsController) {
    this.projectsContainer = document.querySelector('.projects-container');
    this.projectsController = projectsController;
  }

  update() {
    const allProjects = this.projectsController.projects;
    this.projectsContainer.innerHTML = '';
    for (let project of allProjects) {
      const projectElement = this.createProjectElement(project);
      this.projectsContainer.appendChild(projectElement);
    }
  }

  createProjectElement(project) {
    const container = this.createElementWithText('div');
    container.classList.add('project-container');
    const heading = this.createElementWithText('h1', project.title);

    container.appendChild(heading);

    for (let todo of project.todoItems) {
      const todoElement = this.createTodoElement(todo);
      container.appendChild(todoElement);
    }

    return container;
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