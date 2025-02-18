document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".button-container a");
    const currentPath = window.location.pathname; // lấy đường dẫn hiện tại để so khớp

    buttons.forEach(button => {
        if (button.getAttribute('href') === currentPath) {
            button.classList.add("btn-active");
        }
    })
});