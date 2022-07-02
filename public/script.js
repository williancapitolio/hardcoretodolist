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
            todo.classList.add('hidden')
        })
    Array.from(containerTasks.children)
        .filter(todo => todo.textContent.toLowerCase().includes(inputValue))
        .forEach(todo => {
            todo.classList.remove('hidden')
        })
})
