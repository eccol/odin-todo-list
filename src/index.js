import './style.css';
import TodoItem from './todoFactory.js';
import TodoProject from './projectFactory.js';
import DisplayController from './displayController.js';

const defaultProject = new TodoProject('Default Project');
const defaultTodo = new TodoItem('Default Todo', 'A default todo item', 'duedate', 'low');
defaultProject.addTodo(defaultTodo);
console.log(defaultProject);

const displayController = new DisplayController;
displayController.printProject(defaultProject);