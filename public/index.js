const language = document.documentElement.getAttribute("lang");

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
        if (language === "cs") {
            this.firstChild.textContent = "otevři detaily";    
        } else {
            this.firstChild.textContent = "show details";
        }
    }
    else { 
        this.parentElement.classList.add("open");
        if (language === "cs") {
            this.firstChild.textContent = "zavři detaily";    
        } else {
            this.firstChild.textContent = "hide details";
        }
    }
}))


// FORM
const form = document.getElementById("contact-form");
const submitMessage = document.getElementById("submit-message");

const sendMail = (mail) => {
    fetch("https://czechcoder.com/send", {
      method: "post",
      body: mail,
    }).then((response) => {
        if (language === "cs") submitMessage.textContent = "Zpráva byla úspěšně doručena!";
        else submitMessage.textContent = "The message was successfully sent!";
        form.reset();
    }).catch(err => {
        if (language === "cs") submitMessage.textContent = "Zprávu nebylo možné odeslat... Zkus to později.";
        else submitMessage.textContent = "An error occured while sending the message... Try it again later.";
    })
  };

const formEvent = form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (language === "cs") submitMessage.textContent = "Zpráva je na cestě...";
    else submitMessage.textContent = "The message is on the way...";

    let mail = new FormData(form);
    sendMail(mail);
})

// FORM MESSAGE AUTO RESIZE
const formMessage = document.getElementById("form-message");
formMessage.setAttribute("style", "height:" + (formMessage.scrollHeight) + "px");
formMessage.addEventListener("input", OnInput, false);

function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}


// SECTION OBSERVERS
aboutSectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("aboutSectionAnimation", entry.isIntersecting);
        if (entry.isIntersecting) aboutSectionObserver.unobserve(entry.target);
    });
    
}, {threshold: .6})


const aboutSection = document.querySelector(".about");
aboutSectionObserver.observe(aboutSection);

contactSectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("contactSectionAnimation", entry.isIntersecting);
        const socials = document.querySelectorAll(".socials__icon");
        socials.forEach((social, i) => {
            social.style.animation = `animateSocial 1s ${6 + i / 5}s forwards`;      
        })  

        if (entry.isIntersecting) contactSectionObserver.unobserve(entry.target);
    }) 
}, {rootMargin: "-10%"})


const contactSection = document.querySelector(".contact");
contactSectionObserver.observe(contactSection);



