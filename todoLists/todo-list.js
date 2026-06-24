const fs = require('fs');
const FILE_PATH = './data.json';

function readData() {
    const fileContent = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(fileContent);
}

function writeData(data) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
} 

function addTask(task) {
    const data = readData();

    const maxId = data.tasks.length > 0
        ? Math.max(...data.tasks.map(task => task.id))
        : 0

    const newTask = {
        id: maxId + 1,
        task: task,
        completed: false
    }

    data.tasks.push(newTask);
    writeData(data);
    console.log(`Task: '${task}' added successfully`);
}

function viewTasks() {
    const data = readData();
    if(data.tasks.length === 0) {
        console.log('No tasks found');
        return;
    }
    data.tasks.forEach(todo => {
        console.log(`ID: ${todo.id} | Task: ${todo.task} | Status: ${todo.completed === false ? 'Pending' : 'Done'}`);
    });
}

function deleteTask(id) {
    const data = readData();
    const index = data.tasks.findIndex(todo => todo.id === id);

    if(index === -1) {
        console.log(`Task with ID: ${id} not found`);
        return;
    }
    const deletedTask = data.tasks[index];
    data.tasks.splice(index, 1);
    writeData(data);
    console.log(`Task: '${deletedTask.task}' deleted successfully`);
}

function completeTask(id) {
    const data = readData();
    const index = data.tasks.findIndex(todo => todo.id === id);

    if(index === -1) {
        console.log(`Task with ID: ${id} not found`);
        return;
    }
    data.tasks[index].completed = true;
    writeData(data);
    console.log(`Task: '${data.tasks[index].task}' completed successfully`);
}

module.exports = { addTask, viewTasks, deleteTask, completeTask };