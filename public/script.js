const closeMessage = document.querySelector("#messageClose");
const message = document.querySelector("#message");

if (closeMessage != null) {
    closeMessage.addEventListener("click", () => {
        message.style.display = "none";
    });
}

setTimeout(() => {
    if (message != null) {
        message.style.display = "none";
    }
}, 3000);

const inputSearchTodo = document.querySelector('.formSearchTodo input');
const containerTasks = document.querySelector('.containerTasks');

inputSearchTodo.addEventListener('input', event => {
    const inputValue = event.target.value.trim().toLowerCase()
    Array.from(containerTasks.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(inputValue))
        .forEach(todo => {
            //todo.classList.remove('flex')
            todo.classList.add('hidden')
        })
    Array.from(containerTasks.children)
        .filter(todo => todo.textContent.toLowerCase().includes(inputValue))
        .forEach(todo => {
            todo.classList.remove('hidden')
            //todo.classList.add('flex')
        })
})

/*
const filterTodos = (todos, inputValue, returnMatchedTodos) => todos
    .filter(todo => {
        const machedTodos = todo.textContent.toLowerCase().includes(inputValue)
        return returnMatchedTodos ? machedTodos : !machedTodos
    })

const manipulateCLasses = (todos, classToAdd, ClassToRemove) => {
    todos.forEach(todo => {
        todo.classList.remove(classToAdd)
        todo.classList.add(ClassToRemove)
    })
}

const hideTodos = (todos, inputValue) => {
    const todosToHide = filterTodos(todos, inputValue, false)
    manipulateCLasses(todosToHide, 'hidden', 'flex')
}

const showTodos = (todos, inputValue) => {
    const todosToShow = filterTodos(todos, inputValue, true)
    manipulateCLasses(todosToShow, 'flex', 'hidden')
}

inputSearchTodo.addEventListener('input', event => {
    const inputValue = event.target.value.trim().toLowerCase()
    const todos = Array.from(containerTasks.children)
    hideTodos(todos, inputValue)
    showTodos(todos, inputValue)
})
*/