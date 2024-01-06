import './style.css';
import { createTodoItem } from './todoFactory.js';
import { createProject } from './projectFactory.js';

const defaultProject = createProject('Default Project');
const defaultTodo = createTodoItem('Default Todo', 'A default todo item', 'duedate', 'low');
defaultProject.addTodo(defaultTodo);
console.log(defaultProject);