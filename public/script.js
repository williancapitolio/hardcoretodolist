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
});

const data = Array.from(containerTasks.children);

let perPage = 5;
const state = {
    page: 1,
    perPage,
    totalPages: Math.ceil(data.length / perPage),
    maxVisibleButtons: 5
};

const html = {
    get(element) {
        return document.querySelector(element);
    }
};

const controls = {
    next() {
        state.page++
        const lastPage = state.page > state.totalPages
        if (lastPage) {
            state.page--
        }
    },
    prev() {
        state.page--
        if (state.page < 1) {
            state.page++
        }
    },
    goTo(page) {
        if (page < 1) {
            page = 1
        }
        state.page = +page
        if (page > state.totalPages) {
            state.page = state.totalPages
        }
    },
    createListeners() {
        html.get('.first').addEventListener('click', () => {
            controls.goTo(1)
            update()
        })
        html.get('.last').addEventListener('click', () => {
            controls.goTo(state.totalPages)
            update()
        })
        html.get('.next').addEventListener('click', () => {
            controls.next()
            update()
        })
        html.get('.prev').addEventListener('click', () => {
            controls.prev()
            update()
        })
    }
};

const list = {
    create(item) {
        html.get('.containerTasks').appendChild(item)
    },
    update() {
        html.get('.containerTasks').innerHTML = ""
        let page = state.page - 1
        let start = page * state.perPage
        let end = start + state.perPage
        const paginatedItems = data.slice(start, end);
        paginatedItems.forEach(list.create)
    }
};

const buttons = {
    element: html.get('.pagination .numbers'),
    create(number) {
        const button = document.createElement('div');
        button.innerHTML = number;
        if (state.page == number) {
            button.classList.add('active');
        }
        button.addEventListener('click', (event) => {
            const page = event.target.innerText
            controls.goTo(page);
            update();
        })
        buttons.element.appendChild(button);
    },
    update() {
        buttons.element.innerHTML = ""
        const { maxLeft, maxRight } = buttons.calculateMaxVisible()
        for (let page = maxLeft; page <= maxRight; page++) {
            buttons.create(page)
        }
    },
    calculateMaxVisible() {
        const { maxVisibleButtons } = state
        let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2))
        let maxRight = (state.page + Math.floor(maxVisibleButtons / 2))
        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = maxVisibleButtons
        }
        if (maxRight > state.totalPages) {
            maxLeft = state.totalPages - (maxVisibleButtons - 1)
            maxRight = state.totalPages
            if (maxLeft < 1) {
                maxLeft = 1
            }
        }

        return { maxLeft, maxRight }
    }
};

function update() {
    list.update();
    buttons.update();
};

function init() {
    update()
    controls.createListeners();
};

init();