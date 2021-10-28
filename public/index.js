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

headerNav.addEventListener("click", (e) => {
    if (e.target == burger || e.target.parentElement == burger || e.target.classList.contains("header__link") && isMenuOpen()) toggleNav()
});

function isDetailsOpen(workButton) {
    return workButton.parentElement.classList.contains("open");
}

const workButtons = document.querySelectorAll(".work__button");
workButtons.forEach(btn => btn.addEventListener("click", function() {
    if (isDetailsOpen(this)) {
        this.parentElement.classList.remove("open");
        if (window.location.pathname.includes("cs")) {
            this.firstChild.textContent = "otevři detaily";    
        } else {
            this.firstChild.textContent = "show details";
        }
    }
    else { 
        this.parentElement.classList.add("open");
        if (window.location.pathname.includes("cs")) {
            this.firstChild.textContent = "zavři detaily";    
        } else {
            this.firstChild.textContent = "hide details";
        }
    }
}))

// FORM
const form = document.getElementById("contact-form");

const sendMail = (mail) => {
    fetch("https://portfolio-test-project.herokuapp.com/send", {
      method: "post",
      body: mail,
  
    }).then((response) => {
      return response.json();
    }).catch(e => console.log(e));
  };

const formEvent = form.addEventListener("submit", (event) => {
    event.preventDefault();

    let mail = new FormData(form);

    sendMail(mail);
})

// FORM MESSAGE AUTO RESIZE
const formMessage = document.getElementById("form-message");
formMessage.setAttribute("style", "height:" + (formMessage.scrollHeight) + "px;overflow-y:hidden;");
formMessage.addEventListener("input", OnInput, false);

function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}



// SECTION OBSERVERS



