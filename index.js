const { addTask, viewTasks, deleteTask, completeTask } = require('./todoLists/todo-list');

const command = process.argv[2];
const arg1 = process.argv[3];

if(command === 'add') {
    addTask(arg1);
} else if(command === 'view') {
    viewTasks();
} else if(command === 'delete') {
    deleteTask(Number(arg1));
} else if(command === 'complete') {
    completeTask(Number(arg1));
} else {
    console.log('Invalid command. enter: add, view, delete, or complete');
}