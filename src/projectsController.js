import TodoItem from './TodoItem.js';
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

  createTodo(project, title, description, dueDate, priority) {
    const newTodo = new TodoItem(title, description, dueDate, priority);
    project.addTodo(newTodo);
  }

  makeDefaultProject() {
    this.createProject('Default Project');
    const defaultTodo = new TodoItem('Default Todo', 'A default todo item', 'duedate', 'low');
    const testTodo = new TodoItem('another todo', 'descirpto', 'duedate', 'high');
    this.projects[0].addTodo(defaultTodo);
    this.projects[0].addTodo(testTodo);
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