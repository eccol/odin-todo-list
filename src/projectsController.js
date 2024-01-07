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

  createTask(project, title, description, dueDate, priority) {
    const newTask = new TodoTask(title, description, dueDate, priority);
    project.addTask(newTask);
  }

  makeDefaultProject() {
    this.createProject('Default Project');
    const defaultTodo = new TodoTask('Default Todo', 'A default todo item', 'duedate', 'low');
    const testTodo = new TodoTask('another todo', 'descirpto', 'duedate', 'high');
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