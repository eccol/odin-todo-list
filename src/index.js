import './style.css';
import DisplayController from './displayController.js';
import ProjectsController from './projectsController.js';

const projectsController = new ProjectsController;
const displayController = new DisplayController(projectsController);
displayController.update();

document.querySelector('.new-project-button').addEventListener('click', () => {
  const newProjectTitleField = document.getElementById('new-project-name')
  const newProjectTitle = newProjectTitleField.value;
  newProjectTitleField.value = '';
  projectsController.createProject(newProjectTitle || 'New Project');
  displayController.update();
})