import TodoTask from './Task.js';
import TodoProject from './Project.js';

export default class ProjectsController {
  constructor() {
    this.projects = [];
    this.makeDefaultProject();
  }

  addProject(project) {
    this.projects.push(project);
  }

  createProject(title) {
    this.projects.push(new TodoProject(title));
  }

  deleteProject(project) {
    for (let p of this.projects) {
      if (p === project) {
        this.projects.splice(this.projects.indexOf(project), 1);
      }
    }
  }

  createTask(project, title, description, dueDate, priority) {
    const newTask = new TodoTask(title, description, dueDate, priority);
    project.addTask(newTask);
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
    this.createProject('Default Project');
    const defaultTodo = new TodoTask('Default Todo', 'A default todo item', tomorrow, 'low');
    const testTodo = new TodoTask('another todo', 'descirpto', tomorrow, 'high');
    this.projects[0].addTask(defaultTodo);
    this.projects[0].addTask(testTodo);
  }

  getProjectById(id) {
    for (let project of this.projects) {
      if (project.id == id) {
        return project;
      }
    }
    return null;
  }
}