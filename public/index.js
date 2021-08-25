// HEADER NAV
const burger = document.querySelector(".nav-menu");
const headerNav = document.querySelector(".header__nav");
const headerName = document.querySelector(".header__name");

function isMenuOpen() {
    return headerNav.classList.contains("open");
}

function toggleNav() {
    burger.classList.toggle("open");
    if (isMenuOpen()) {
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
}

// burger.addEventListener("click", () => {
//     toggleNav();
// })

headerNav.addEventListener("click", (e) => {
    if (e.target == burger || e.target.parentElement == burger || e.target.classList.contains("header__link") && isMenuOpen()) toggleNav()
});


// SECTION OBSERVERS