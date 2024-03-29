import createElementWithText from './createElementWithText.js';

export default class DisplayController {
  constructor() {
    this.projectsContainer = document.querySelector('.projects-container');
  }

  updateProjectList(projects) {
    const projectList = document.createElement('ul');
    projectList.classList.add('project-list');
    for (let p of projects) {
      const projectItem = this.createProjectList(p);
      projectList.appendChild(projectItem);
    }

    document.querySelector('.project-list').replaceWith(projectList);
  }

  updateProject(project) {
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project-container');

    const addTaskButton = createElementWithText('button', 'New Item', 'add-task-button');
    addTaskButton.addEventListener('click', () => {
      document.getElementById('new-task-projectid').value = project.id;
      document.getElementById('new-task-dialog').showModal();
      document.getElementById('normal').value = 'Normal'; // Default value
    });
    projectContainer.appendChild(addTaskButton);

    for (let t of project.tasks) {
      const taskItem = this.createTaskElement(t);
      projectContainer.appendChild(taskItem);
    }
    document.querySelector('.project-container').replaceWith(projectContainer);
  }

  updateTask(task) {
    const taskElement = document.querySelector(`[data-taskid="${task.id}"]`);
    taskElement.replaceWith(this.createTaskElement(task));
  }

  updateProgressBar(project) {
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    const completion = project.percentCompleted;
    progressBar.style.width = `${completion}%`;
    progressBar.style.height = '5px';
    return progressBar;
  }

  createProjectList(project) {
    const projectItem = document.createElement('li');
    projectItem.innerText = project.title;
    projectItem.addEventListener('click', () => {
      this.updateProject(project);
    })

    const progressBar = this.updateProgressBar(project);
    projectItem.appendChild(progressBar);

    return projectItem;
  }

  createTaskElement(task) {
    const taskContainer = createElementWithText('div', null, 'task-container');
    taskContainer.classList.toggle('completed', task.complete);

    const taskHeader = createElementWithText('div', null, 'task-header');
    const taskBody = createElementWithText('div', null, 'task-body');

    const completed = document.createElement('input');
    completed.type = 'checkbox';
    completed.dataset.taskid = task.id;
    completed.checked = task.complete;
    completed.addEventListener('change', () => {
      task.toggleComplete();
      taskContainer.classList.toggle('completed');
      this.updateTask(task);
      this.updateProjectList(this.projectsController.projects);
    })

    const heading = createElementWithText('h2', task.title);
    const deleteTask = createElementWithText('button', 'X', 'delete-button');
    deleteTask.addEventListener('click', () => {
      this.projectsController.deleteTask(task);
      taskContainer.remove();
      this.updateProjectList(this.projectsController.projects);
    })

    taskHeader.append(completed, heading, deleteTask);
    heading.addEventListener('click', () => {
      taskContainer.classList.toggle('expanded');
      taskBody.style.maxHeight = taskContainer.classList.contains('expanded')
        ? taskBody.scrollHeight + 'px'
        : 0;
    });

    const dueDate = createElementWithText('p', 'Due ' + task.dueDate);
    dueDate.classList.toggle('overdue', task.overdue);
    const priority = createElementWithText('p', task.priority + ' Priority');
    const body = createElementWithText('p', task.description);
    if (task.dueDate) { taskBody.appendChild(dueDate) };
    taskBody.append(priority, body);

    taskContainer.append(taskHeader, taskBody);

    const previousItem = document.querySelector(`[data-taskid="${task.id}"]`);
    const previousBody = previousItem ? previousItem.querySelector('.task-body') : null;
    const previousHeight = previousItem ? previousBody.style.maxHeight : null;
    taskBody.style.maxHeight = previousItem ? previousHeight : 0;
    taskContainer.classList.toggle('expanded', previousHeight > '0px');

    taskContainer.dataset.taskid = task.id;
    return taskContainer;
  }
}