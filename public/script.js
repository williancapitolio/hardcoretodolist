const closeMessage = document.querySelector("#messageClose");
const message = document.querySelector("#message");

closeMessage.addEventListener("click", () => {
    message.style.display = "none";
});

setTimeout(() => {
    message.style.display = "none";
}, 3000);