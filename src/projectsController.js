import TodoTask from './Task.js';
import TodoProject from './Project.js';

export default class ProjectsController {
  constructor() {
    this.projects = [];
  }

  createProject(title) {
    const newProject = new TodoProject(title)
    this.projects.push(newProject);
    return newProject;
  }

  deleteProject(project) {
    for (let p of this.projects) {
      if (p === project) {
        this.projects.splice(this.projects.indexOf(project), 1);
      }
    }
  }

  createTask({ project, title, description, dueDate, priority }) {
    const newTask = new TodoTask(title, description, dueDate, priority);
    project.addTask(newTask);
    return newTask;
  }

  deleteTask(task) {
    for (let p of this.projects) {
      for (let t of p.tasks) {
        if (t === task) {
          p.tasks.splice(p.tasks.indexOf(task), 1);
          return;
        }
      }
    }
  }

  makeDefaultProject() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.createProject('Default Project');
    const default1 = new TodoTask('Default Task', 'This task has no due date.', null, 'Normal');
    const default2 = new TodoTask('Important Task', 'This task has a due date and high priority.', tomorrow, 'High');
    default2.toggleComplete();
    const default3 = new TodoTask('Overdue Task', "This task's due date has passed.", yesterday, 'Low');
    this.projects[0].addTask(default1);
    this.projects[0].addTask(default2);
    this.projects[0].addTask(default3);
  }

  getProjectById(id) {
    for (let project of this.projects) {
      if (project.id == id) {
        return project;
      }
    }
    return null;
  }

  getProjectByTask(task) {
    for (let p of this.projects) {
      for (let t of p.tasks) {
        if (t === task) {
          return p;
        }
      }
    }
    return null;
  }
}