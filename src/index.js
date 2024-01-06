import './style.css';
import TodoItem from './TodoItem.js';
import TodoProject from './Project.js';
import DisplayController from './displayController.js';

const defaultProject = new TodoProject('Default Project');
const defaultTodo = new TodoItem('Default Todo', 'A default todo item', 'duedate', 'low');
const testTodo = new TodoItem('another todo', 'descirpto', 'duedate', 'high');
defaultProject.addTodo(defaultTodo);
defaultProject.addTodo(testTodo);
console.log(defaultProject);

const displayController = new DisplayController;
displayController.printProject(defaultProject);