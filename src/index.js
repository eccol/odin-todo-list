import './style.css';
import DisplayController from './displayController.js';
import ProjectsController from './projectsController.js';
import StorageController from './storageController.js';

const storageController = new StorageController;
const projectsController = new ProjectsController;
storageController.loadProjects(projectsController);
const displayController = new DisplayController(projectsController);
displayController.update();

document.querySelector('.new-project-button').addEventListener('click', () => {
  const newProjectTitleField = document.getElementById('new-project-name')
  const newProjectTitle = newProjectTitleField.value;
  newProjectTitleField.value = '';
  projectsController.createProject(newProjectTitle || 'New Project');
  displayController.update();
})

document.getElementById('save-button').addEventListener('click', () => {
  localStorage.setItem('allProjects', JSON.stringify(projectsController.projects));
});

document.getElementById('delete-saved-data-button').addEventListener('click', () => {
  localStorage.removeItem('allProjects');
})