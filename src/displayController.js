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

  updateProgressBar(progressBar) {
    return;
    const project = this.projectsController.getProjectById(progressBar.dataset.projectid);
    progressBar.style.width = `${project.percentCompleted}%`;
  }

  createProjectList(project) {
    const projectItem = document.createElement('li');
    projectItem.innerText = project.title;
    projectItem.addEventListener('click', () => {
      this.updateProject(project);
    })

    return projectItem;
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
      taskContainer.classList.toggle('completed');
      this.updateTask(task);
      const project = this.projectsController.getProjectByTask(task);
      const progressBar = document.querySelector(`[data-projectid="${project.id}"]`)
      this.updateProgressBar(progressBar);
    })
    if (task.complete) { completed.checked = true; }
    const heading = createElementWithText('h2', task.title);
    const deleteTask = createElementWithText('button', 'X', 'delete-button');
    deleteTask.addEventListener('click', () => {
      this.projectsController.deleteTask(task);
      taskContainer.remove();
    })
    taskHeader.appendChild(completed);
    taskHeader.appendChild(heading);
    taskHeader.appendChild(deleteTask);
    heading.addEventListener('click', () => {
      taskContainer.classList.toggle('expanded');
      if (taskContainer.classList.contains('expanded')) {
        taskBody.style.maxHeight = taskBody.scrollHeight + 'px';
      } else {
        taskBody.style.maxHeight = 0;
      }
    });

    const dueDate = createElementWithText('p', 'Due ' + task.dueDate);
    if (task.overdue) { dueDate.classList.add('overdue') };
    const priority = createElementWithText('p', task.priority + ' Priority');
    const body = createElementWithText('p', task.description);
    if (task.dueDate) { taskBody.appendChild(dueDate) };
    taskBody.appendChild(priority);
    taskBody.appendChild(body);

    taskContainer.appendChild(taskHeader);
    taskContainer.appendChild(taskBody);
    // Elements have no scrollheight before being drawn so temporarily set maxHeight to a large number
    taskBody.style.maxHeight = 0;

    taskContainer.dataset.taskid = task.id;
    return taskContainer;
  }
}