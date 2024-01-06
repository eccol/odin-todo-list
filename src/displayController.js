import createElementWithText from './createElementWithText.js';

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
    const container = createElementWithText('div', null, 'todo-container');
    const heading = createElementWithText('h1', project.title);

    container.appendChild(heading);

    for (let todo of project.todoItems) {
      const todoElement = this.createTodoElement(todo);
      container.appendChild(todoElement);
    }

    return container;
  }

  createTodoElement(todo) {
    const container = createElementWithText('div', null, 'todo-container');
    const heading = createElementWithText('h2', todo.title);
    const body = createElementWithText('p', todo.description);

    container.appendChild(heading);
    container.appendChild(body);
    return container;
  }
}