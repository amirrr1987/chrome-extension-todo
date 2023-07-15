const taskInput = document.querySelector(".form__input");
const addButton = document.querySelector(".form__btn");
const taskList = document.querySelector(".task");

const taskStorageHandler = () => {
    const data = localStorage.getItem('taskListStorage');
    return JSON.parse(data) || [];
}

const taskRemoveHandler = (index) => {
    const taskStorage = taskStorageHandler()
    if (taskStorage[index].checked) {
        taskStorage.splice(index, 1)
    }
    localStorage.setItem('taskListStorage', JSON.stringify(taskStorage));
    taskInput.value = "";
    taskInput.focus();
    setStorage();
}

const taskCompleteHandler = (index) => {
    const taskStorage = taskStorageHandler()
    // if(index>=0){
        taskStorage[index].checked = !taskStorage[index].checked
    // }
    localStorage.setItem('taskListStorage', JSON.stringify(taskStorage));
    taskInput.value = "";
    taskInput.focus();
    setStorage();
}

const taskItemGenerator = (index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add('task__item');
    taskItem.addEventListener("click", () => taskCompleteHandler(index));
    return taskItem;
}

const taskTextGenerator = () => {
    const taskText = document.createElement("span");
    taskText.classList.add('task__text');
    return taskText;
}

const taskCompleteGenerator = (index) => {
    const taskRemove = document.createElement("img");
    taskRemove.src = './assets/images/delete.png';
    taskRemove.classList.add('task__remove');
    taskRemove.addEventListener("click", () => taskRemoveHandler(index));
    return taskRemove;
}

const setStorage = () => {
    taskList.innerHTML = "";
    const taskStorage = taskStorageHandler()

    if(taskStorage.length > 0 ){
        taskStorage.forEach((element, index) => {
            const taskItem = taskItemGenerator(index);
            const taskText = taskTextGenerator();
            taskItem.appendChild(taskText);
            taskList.appendChild(taskItem);
    
            taskText.textContent = element.label;
            if (element.checked) {
                const taskComplete = taskCompleteGenerator(index);
                taskItem.appendChild(taskComplete);
                taskText.classList.add('task--complete')
            }
        });
    }
}


const addToList = (event) => {
    event.preventDefault();
    if (!!taskInput.value) {

        const data = localStorage.getItem('taskListStorage');
        const taskStorage = JSON.parse(data) || [];

        taskStorage.push({ label: taskInput.value, checked: false })
        localStorage.setItem('taskListStorage', JSON.stringify(taskStorage));

        taskInput.value = "";
        taskInput.focus();

        setStorage();
    }
}

const checkPressEnter = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        addToList(event)
    }
};



const toDoHandler = async () => {
    setStorage();
    taskInput.addEventListener("keydown", checkPressEnter);
    addButton.addEventListener("click", addToList)
};

document.addEventListener("DOMContentLoaded", toDoHandler);