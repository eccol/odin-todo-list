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
    const projectHeader = createElementWithText('div', null, 'project-header');
    const heading = createElementWithText('h1', project.title + ' (' + project.percentCompleted + '%)');
    projectHeader.appendChild(heading);

    const projectBody = createElementWithText('div', null, 'project-body');

    const button = createElementWithText('button', 'X', 'delete-button');
    button.addEventListener('click', () => {
      this.projectsController.deleteProject(project);
      this.update();
    })
    projectHeader.appendChild(button);
    projectHeader.addEventListener('click', () => {
      container.classList.toggle('collapsed');
    })

    container.appendChild(projectHeader);

    for (let task of project.tasks) {
      const taskElement = this.createTaskElement(task);
      projectBody.appendChild(taskElement);
    }

    const addTaskButton = createElementWithText('button', 'New Item', 'add-task-button');
    addTaskButton.addEventListener('click', () => {
      document.getElementById('new-task-projectid').value = project.id;
      document.getElementById('new-task-dialog').showModal();
    });

    projectBody.appendChild(addTaskButton);
    container.appendChild(projectBody);

    return container;
  }

  createTaskElement(task) {
    const taskContainer = createElementWithText('div', null, 'task-container');
    if (task.complete) { taskContainer.classList.add('completed') };
    const taskHeader = createElementWithText('div', null, 'task-header');
    const taskBody = createElementWithText('div', null, 'task-body');

    const completed = document.createElement('input');
    completed.type = 'checkbox';
    completed.dataset.taskid = task.id;
    completed.addEventListener('change', () => {
      task.toggleComplete();
      this.update();
    })
    if (task.complete) { completed.checked = true; }
    const heading = createElementWithText('h2', task.title);
    const deleteTask = createElementWithText('button', 'X', 'delete-button');
    deleteTask.addEventListener('click', () => {
      this.projectsController.deleteTask(task);
      this.update();
    })
    taskHeader.appendChild(completed);
    taskHeader.appendChild(heading);
    taskHeader.appendChild(deleteTask);
    taskHeader.addEventListener('click', () => {
      taskContainer.classList.toggle('collapsed');
    })

    const dueDate = createElementWithText('p', 'Due ' + task.dueDate);
    if (task.overdue) { dueDate.classList.add('overdue') };
    const priority = createElementWithText('p', task.priority + ' Priority');
    const body = createElementWithText('p', task.description);
    if (task.dueDate) { taskBody.appendChild(dueDate) };
    taskBody.appendChild(priority);
    taskBody.appendChild(body);

    taskContainer.appendChild(taskHeader);
    taskContainer.appendChild(taskBody);
    taskContainer.classList.add('collapsed');
    return taskContainer;
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
    const newDate = newDateField.valueAsDate;
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