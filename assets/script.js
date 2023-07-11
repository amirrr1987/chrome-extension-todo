const taskInput = document.querySelector(".form__input");
const addButton = document.querySelector(".form__add");
const taskList = document.querySelector(".task");

const removeTaskHandler = (index) => {
    event.preventDefault();
    const data = localStorage.getItem('taskListStorage');
    const taskStorage = JSON.parse(data) || [];
    taskStorage.splice(index,1)
    localStorage.setItem('taskListStorage', JSON.stringify(taskStorage));
    taskInput.value = "";
    taskInput.focus();
    setStorage();
}

const taskItemGenerator = () => {
    const taskItem = document.createElement("li");
    taskItem.classList.add('task__item');
    return taskItem;
}

const taskTextGenerator = () => {
    const taskText = document.createElement("span");
    taskText.classList.add('task__text');
    return taskText;
}

const taskRemoveGenerator = (index) => {
    const taskRemove = document.createElement("img");
    taskRemove.src = './assets/images/checked.png';
    taskRemove.classList.add('task__remove');
    taskRemove.addEventListener("click", () => removeTaskHandler(index));
    return taskRemove;
}

const setStorage = () => {
    taskList.innerHTML = "";
    const data = localStorage.getItem('taskListStorage');
    const taskStorage = JSON.parse(data) || [];

    taskStorage.forEach((element, index) => {
        const taskItem = taskItemGenerator();
        const taskText = taskTextGenerator();
        const taskRemove = taskRemoveGenerator(index);
        taskItem.appendChild(taskText);
        taskItem.appendChild(taskRemove);
        taskList.appendChild(taskItem);
        taskText.textContent = element.label;
    });
}

const checkPressEnter = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        event.preventDefault();
        const data = localStorage.getItem('taskListStorage');
        const taskStorage = JSON.parse(data) || [];
        taskStorage.push({ label: event.target.value, checked: false })
        localStorage.setItem('taskListStorage', JSON.stringify(taskStorage));
        taskInput.value = "";
        taskInput.focus();
        setStorage();
    }
};

const toDoHandler = async () => {
    setStorage();
    addButton.addEventListener("click", checkPressEnter);
    taskInput.addEventListener("keydown", checkPressEnter);
};

document.addEventListener("DOMContentLoaded", toDoHandler);