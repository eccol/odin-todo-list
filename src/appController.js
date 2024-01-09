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
    this.displayController.updateProject(this.projectsController.projects[0]);
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
      document.getElementById('new-project-dialog').showModal();
    })

    document.getElementById('new-project-cancel').addEventListener('click', () => {
      document.getElementById('new-project-dialog').close();
    })

    document.getElementById('new-project-submit').addEventListener('click', () => {
      const title = this.readProjectDialog();
      const newProject = this.projectsController.createProject(title);
      this.displayController.updateProjectList(this.projectsController.projects);
      this.displayController.updateProject(newProject);
    })

    document.getElementById('save-button').addEventListener('click', () => {
      this.storageController.saveProjects(this.projectsController);
    });

    document.getElementById('delete-saved-data-button').addEventListener('click', () => {
      this.storageController.deleteSavedData();
    })
  }

  readProjectDialog() {
    document.getElementById('new-project-dialog').close();

    const newTitleField = document.getElementById('new-project-name');
    const title = newTitleField.value || 'New Project';
    newTitleField.value = '';

    return title;
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
    const priority = newPriorityField.value || "Normal";
    const projectid = newProjectidField.value;
    newTitleField.value = '';
    newDescriptionField.value = '';
    newDateField.value = '';

    return { title, description, dueDate, priority, projectid };
  }
}