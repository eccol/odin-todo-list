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
    const container = createElementWithText('div', null, 'project-container');
    const heading = createElementWithText('h1', project.title);

    container.appendChild(heading);

    for (let task of project.tasks) {
      const taskElement = this.createTaskElement(task);
      container.appendChild(taskElement);
    }

    const addTaskButton = createElementWithText('button', 'New Item', 'add-task-button');
    addTaskButton.addEventListener('click', () => {
      document.getElementById('new-task-projectid').value = project.id;
      document.getElementById('new-task-dialog').showModal();
    });
    container.appendChild(addTaskButton);

    const button = createElementWithText('button', 'Delete Project');
    button.addEventListener('click', () => {
      this.projectsController.deleteProject(project);
      this.update();
    })
    container.appendChild(button);

    return container;
  }

  createTaskElement(task) {
    const container = createElementWithText('div', null, 'task-container');
    const completed = document.createElement('input');
    completed.type = 'checkbox';
    completed.dataset.taskid = task.id;
    if (task.completed) { completed.checked = true; }
    completed.addEventListener('change', () => {
      task.toggleComplete();
    })
    const heading = createElementWithText('h2', task.title);
    const body = createElementWithText('p', task.description);
    const dueDate = createElementWithText('p', task.dueDate);
    const priority = createElementWithText('p', task.priority);
    const deleteTask = createElementWithText('button', 'Delete Task');
    deleteTask.addEventListener('click', () => {
      this.projectsController.deleteTask(task);
      this.update();
    })

    container.appendChild(completed);
    container.appendChild(heading);
    container.appendChild(body);
    container.appendChild(dueDate);
    container.appendChild(priority);
    container.appendChild(deleteTask);
    return container;
  }

  createEventListeners() {
    const cancelButton = document.getElementById('new-task-cancel');
    cancelButton.addEventListener('click', () => {
      document.getElementById('new-task-dialog').close();
    })

    const submitButton = document.getElementById('new-task-submit');
    submitButton.addEventListener('click', () => {
      this.readTaskDialog();
    })
  }

  readTaskDialog() {
    const newTitleField = document.getElementById('new-task-name');
    const newDescriptionField = document.getElementById('new-task-body');
    const newDateField = document.getElementById('new-task-due');
    const newPriorityField = document.getElementById('new-task-priority');
    const newProjectidField = document.getElementById('new-task-projectid');

    const newTitle = newTitleField.value || "New Task";
    const newDescription = newDescriptionField.value || "New Task";
    const newDate = newDateField.value || "Due Date";
    const newPriority = newPriorityField.value || "Priority";
    const newProjectid = newProjectidField.value;
    newTitleField.value = '';
    newDescriptionField.value = '';
    newDateField.value = '';
    newPriorityField.value = '';

    const project = this.projectsController.getProjectById(newProjectid);
    this.projectsController.createTask(project, newTitle, newDescription, newDate, newPriority);
    document.getElementById('new-task-dialog').close();
    this.update();
  }
}