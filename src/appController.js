export default class AppController {
  constructor({ projectsController, displayController, storageController }) {
    this.projectsController = projectsController;
    this.displayController = displayController;
    this.storageController = storageController;
  }

  start() {
    this.storageController.loadProjects(this.projectsController);
    this.displayController.projectsController = this.projectsController; //smelly
    this.createEventListeners();
    this.displayController.updateProjectList(this.projectsController.projects);
  }

  createEventListeners() {
    const cancelButton = document.getElementById('new-task-cancel');
    cancelButton.addEventListener('click', () => {
      document.getElementById('new-task-dialog').close();
    })

    const submitButton = document.getElementById('new-task-submit');
    submitButton.addEventListener('click', () => {
      const args = this.readTaskDialog();
      const project = this.projectsController.getProjectById(args.projectid);
      Object.assign(args, { project });
      this.projectsController.createTask(args);
      this.displayController.updateProject(project);
    })

    document.querySelector('.new-project-button').addEventListener('click', () => {
      const newProjectTitleField = document.getElementById('new-project-name')
      const newProjectTitle = newProjectTitleField.value;
      newProjectTitleField.value = '';
      this.projectsController.createProject(newProjectTitle || 'New Project');
      this.displayController.updateProjectList(this.projectsController.projects);
    })

    document.getElementById('save-button').addEventListener('click', () => {
      this.storageController.saveProjects(this.projectsController);
    });

    document.getElementById('delete-saved-data-button').addEventListener('click', () => {
      this.storageController.deleteSavedData();
    })
  }

  readTaskDialog() {
    document.getElementById('new-task-dialog').close();

    const newTitleField = document.getElementById('new-task-name');
    const newDescriptionField = document.getElementById('new-task-body');
    const newDateField = document.getElementById('new-task-due');
    const newPriorityField = document.getElementById('new-task-priority');
    const newProjectidField = document.getElementById('new-task-projectid');

    const title = newTitleField.value || "New Task";
    const description = newDescriptionField.value || "New Task";
    const dueDate = newDateField.valueAsDate;
    const priority = newPriorityField.value || "Priority";
    const projectid = newProjectidField.value;
    newTitleField.value = '';
    newDescriptionField.value = '';
    newDateField.value = '';
    newPriorityField.value = '';

    return { title, description, dueDate, priority, projectid };
  }
}