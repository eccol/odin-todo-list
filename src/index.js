import './style.css';
import AppController from './appController.js';
import DisplayController from './displayController.js';
import ProjectsController from './projectsController.js';
import StorageController from './storageController.js';

const appController = new AppController({
  projectsController: new ProjectsController,
  displayController: new DisplayController,
  storageController: new StorageController
});

appController.start();