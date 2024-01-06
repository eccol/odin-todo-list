import './style.css';
import TodoItem from './TodoItem.js';
import TodoProject from './Project.js';
import DisplayController from './displayController.js';

const projects = [];

const defaultProject = new TodoProject('Default Project');
const defaultTodo = new TodoItem('Default Todo', 'A default todo item', 'duedate', 'low');
const testTodo = new TodoItem('another todo', 'descirpto', 'duedate', 'high');
defaultProject.addTodo(defaultTodo);
defaultProject.addTodo(testTodo);
console.log(defaultProject);
projects.push(defaultProject);

const displayController = new DisplayController;
displayController.update(projects);

document.querySelector('.new-project-button').addEventListener('click', () => {
  const newProjectTitleField = document.getElementById('new-project-name')
  const newProjectTitle = newProjectTitleField.value;
  newProjectTitleField.value = '';
  const newProject = new TodoProject(newProjectTitle || 'New Project');
  projects.push(newProject);
  displayController.update(projects);
})