export default class StorageController {
  loadProjects(projectsController) {
    const savedProjects = localStorage.allProjects;
    if (!savedProjects) {
      projectsController.makeDefaultProject();
      return;
    };

    const parse = JSON.parse(savedProjects);

    for (let project of parse) {
      const newProject = projectsController.createProject(project.title);
      for (let task of project.tasks) {
        let loadedDate = task._dueDate;
        if (loadedDate) { loadedDate = new Date(loadedDate) };
        const newTask = projectsController.createTask(newProject, task.title, task.description, loadedDate, task.priority);
        if (task.complete) {
          newTask.toggleComplete();
        }
      }
    }
  }
}