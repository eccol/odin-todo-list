export default class DisplayController {
  printProject(project) {
    const container = document.createElement('div');
    const heading = document.createElement('h1');
    heading.innerText = project.title;

    container.appendChild(heading);
    document.body.appendChild(container);
  }

  printTodo(todo) {
    const container = document.createElement('div');
    const heading = document.createElement('h2');
    heading.innerText = todo.title;
    const body = document.createElement('p');
    body.innerText = todo.description;

    container.appendChild(heading);
    container.appendChild(body);
    document.body.appendChild(container);
  }
}