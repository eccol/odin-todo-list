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

  makeDefaultProject() {
    this.createProject('Default Project');
    const defaultTodo = new TodoItem('Default Todo', 'A default todo item', 'duedate', 'low');
    const testTodo = new TodoItem('another todo', 'descirpto', 'duedate', 'high');
    this.projects[0].addTodo(defaultTodo);
    this.projects[0].addTodo(testTodo);
  }
}