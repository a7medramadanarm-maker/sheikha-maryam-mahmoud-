document.addEventListener("DOMContentLoaded", () => {
"use strict";

/* ================================
   Mobile Menu
================================= */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("show");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            if (navbar.classList.contains("show")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    });

    /* Close menu after clicking a link */
    const navLinks = navbar.querySelectorAll("a");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navbar.classList.remove("show");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    });
}


/* ================================
   Header Scroll Effect
================================= */

const header = document.querySelector(".header");

function handleHeaderScroll() {
    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", handleHeaderScroll);
handleHeaderScroll();


/* ================================
   FAQ Accordion
================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {

        /* Close other FAQ items */
        faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.classList.remove("active");
            }
        });

        /* Toggle current item */
        item.classList.toggle("active");
    });
});


/* ================================
   Smooth Scrolling
================================= */

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const headerHeight = header ? header.offsetHeight : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    });
});


/* ================================
   Active Navigation Link
================================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll('.navbar a[href^="#"]');

function updateActiveNavigation() {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navigationLinks.forEach((link) => {
        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation);
updateActiveNavigation();


/* ================================
   Reveal Animation
================================= */

const revealElements = document.querySelectorAll(
    ".service-card, .about-content, .about-image, .package-card, .review-card, .contact-card"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observerInstance.unobserve(entry.target);
                }
            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        observer.observe(element);
    });

} else {

    revealElements.forEach((element) => {
        element.classList.add("revealed");
    });
}


/* ================================
   Back To Top Button
================================= */

const backToTop = document.createElement("button");

backToTop.className = "back-to-top";
backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
backToTop.setAttribute("aria-label", "العودة إلى أعلى الصفحة");

document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ================================
   Current Year
================================= */

const yearElement = document.getElementById("currentYear");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ================================
   Prevent Empty Contact Links
================================= */

const placeholderLinks = document.querySelectorAll(
    'a[href="tel:"], a[href="#"]'
);

placeholderLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const href = link.getAttribute("href");

        if (href === "tel:" || href === "#") {
            event.preventDefault();
        }

    });

});

});
