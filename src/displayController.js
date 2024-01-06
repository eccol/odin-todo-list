import createElementWithText from './createElementWithText.js';

export default class DisplayController {
  constructor(projectsController) {
    this.projectsContainer = document.querySelector('.projects-container');
    this.projectsController = projectsController;
    this.createEventListeners();
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

    const addTodoButton = createElementWithText('button', 'New Item', 'add-todo-button');
    addTodoButton.addEventListener('click', () => {
      document.getElementById('new-todo-projectid').value = project.id;
      document.getElementById('new-todo-dialog').showModal();
    });
    container.appendChild(addTodoButton);

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

  createEventListeners() {
    const cancelButton = document.getElementById('new-todo-cancel');
    cancelButton.addEventListener('click', () => {
      document.getElementById('new-todo-dialog').close();
    })

    const submitButton = document.getElementById('new-todo-submit');
    submitButton.addEventListener('click', () => {
      this.readTodoDialog();
    })
  }

  readTodoDialog() {
    const newTitleField = document.getElementById('new-todo-name');
    const newDescriptionField = document.getElementById('new-todo-body');
    const newDateField = document.getElementById('new-todo-due');
    const newPriorityField = document.getElementById('new-todo-priority');
    const newProjectidField = document.getElementById('new-todo-projectid');

    const newTitle = newTitleField.value || "New Todo";
    const newDescription = newDescriptionField.value || "New Todo";
    const newDate = newDateField.value || "Due Date";
    const newPriority = newPriorityField.value || "Priority";
    const newProjectid = newProjectidField.value;
    newTitleField.value = '';
    newDescriptionField.value = '';
    newDateField.value = '';
    newPriorityField.value = '';

    const project = this.projectsController.getProjectById(newProjectid);
    this.projectsController.createTodo(project, newTitle, newDescription, newDate, newPriority);
    document.getElementById('new-todo-dialog').close();
    this.update();
  }
}