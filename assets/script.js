const toDoHandler = async () => {
    const taskInput = document.querySelector(".form__input");
    const addButton = document.querySelector(".form__add");
    const taskList = document.querySelector(".task");

    const taskItemGenerator = () => {
        const taskItem = document.createElement("li");
        taskItem.classList.add('task__item');
        return taskItem
    }
    const taskTextGenerator = () => {
        const taskText = document.createElement("span");
        taskText.classList.add('task__text');
        return taskText
    }
    const taskRemoveGenerator = () => {
        const taskRemove = document.createElement("img");
        taskRemove.src = './assets/images/checked.png';
        taskRemove.classList.add('task__remove');
        return taskRemove
    }

    const data = localStorage.getItem('taskListStorage');
    const getStorage = JSON.parse(data) || [];

    getStorage.forEach((element, index) => {

        const taskItem =  taskItemGenerator()
        const taskText = taskTextGenerator()
        const taskRemove = taskRemoveGenerator()

        taskText.textContent = element.label;
        taskItem.appendChild(taskText);
        taskItem.appendChild(taskRemove);
        taskList.appendChild(taskItem);
    });
    const addToList = () => {
        const taskText = taskInput.value;
        if (!!taskText) {

            const taskItem =  taskItemGenerator()
            const taskText = taskTextGenerator()
            const taskRemove = taskRemoveGenerator()

            taskItem.appendChild(taskText);
            taskItem.appendChild(taskRemove);
            taskList.appendChild(taskItem);

            taskText.textContent = taskInput.value;
            getStorage.push({ label: taskInput.value, checked: false });
            localStorage.setItem('taskListStorage', JSON.stringify(getStorage));
            taskInput.value = "";
        }
    };

    const checkPressEnter = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            addToList();
            taskInput.focus();
        }
    };

    addButton.addEventListener("click", addToList);
    taskInput.addEventListener("keydown", checkPressEnter);
};

document.addEventListener("DOMContentLoaded", toDoHandler);
