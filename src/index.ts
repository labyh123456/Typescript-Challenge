
import { v4 as uuidV4 } from 'uuid';
// console.log(uuidV4());
// export {}
type Task = {
    id: string,
    title: string,
    completed: boolean,
    createAt:Date
}
const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const input = document.querySelector<HTMLInputElement>('#new-task-title');

const tasks: Task[] = loadTasks();

tasks.forEach(addListItem)


form?.addEventListener('submit', e => {
    e.preventDefault();
   
    if (input?.value == '' || input?.value == null) return;
    const task : Task = {
        id: uuidV4(),
        title: input?.value,
        completed: false,
        createAt: new Date()
    }


    addListItem(task);
    tasks.push(task)
    saveTasks();
    input.value = '';
}) 

function addListItem(task: Task) {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks()
    })
    checkbox.type = "checkbox";
    checkbox.checked = task.completed
    label.append(checkbox, task.title);
    item.append(label);
    list?.append(item);
}

function saveTasks() {
    localStorage.setItem('TASK', JSON.stringify(tasks));
}

function loadTasks(): Task[]{
    const taskJSON = localStorage.getItem('TASK');
    if (taskJSON == null) return [];
    return JSON.parse(taskJSON);
}