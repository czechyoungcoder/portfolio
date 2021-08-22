// HEADER NAV
const burger = document.querySelector(".nav-menu");
const headerNav = document.querySelector(".header__nav");
const headerName = document.querySelector(".header__name");

burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    if (headerNav.classList.contains("open")) {
        headerNav.classList.remove("open");
        headerNav.classList.add("close");
        headerName.classList.remove("inverse");
        document.body.style.overflowY = "scroll";
    } else {
        headerNav.classList.add("open");
        headerNav.classList.remove("close");
        headerName.classList.add("inverse");
        document.body.style.overflowY = "hidden";
    }
})