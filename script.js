document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================
       SETTINGS
    ========================================= */

    /*
        اكتب رقم واتساب هنا بصيغة دولية بدون +
        مثال مصر:
        2010XXXXXXXXX
    */

    const WHATSAPP_NUMBER = "";

    /*
        اكتب رقم الهاتف هنا
        مثال:
        01000000000
    */

    const PHONE_NUMBER = "";


    /* =========================================
       MOBILE MENU
    ========================================= */

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

                    menuToggle.setAttribute(
                        "aria-label",
                        "إغلاق القائمة"
                    );

                } else {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                    menuToggle.setAttribute(
                        "aria-label",
                        "فتح القائمة"
                    );
                }
            }
        });


        /* إغلاق القائمة بعد اختيار أي قسم */

        const navLinks = navbar.querySelectorAll("a");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navbar.classList.remove("show");

                const icon = menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

                menuToggle.setAttribute(
                    "aria-label",
                    "فتح القائمة"
                );

            });

        });
    }


    /* =========================================
       HEADER SCROLL EFFECT
    ========================================= */

    const header = document.getElementById("header");

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }
    }

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =========================================
       FAQ ACCORDION
    ========================================= */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");

        if (!question) return;


        question.setAttribute(
            "aria-expanded",
            "false"
        );


        question.addEventListener("click", () => {

            const isActive =
                item.classList.contains("active");


            /* إغلاق جميع الأسئلة الأخرى */

            faqItems.forEach((otherItem) => {

                if (otherItem !== item) {

                    otherItem.classList.remove("active");

                    const otherQuestion =
                        otherItem.querySelector(
                            ".faq-question"
                        );

                    const otherAnswer =
                        otherItem.querySelector(
                            ".faq-answer"
                        );

                    if (otherQuestion) {

                        otherQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                    if (otherAnswer) {

                        otherAnswer.style.maxHeight = null;

                    }
                }
            });


            /* فتح / إغلاق السؤال الحالي */

            if (isActive) {

                item.classList.remove("active");

                question.setAttribute(
                    "aria-expanded",
                    "false"
                );

                if (answer) {

                    answer.style.maxHeight = null;

                }

            } else {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                if (answer) {

                    answer.style.maxHeight =
                        answer.scrollHeight + "px";

                }
            }

        });

    });


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


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


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navigationLinks =
        document.querySelectorAll(
            '.navbar a[href^="#"]'
        );


    function updateActiveNavigation() {

        let currentSection = "";


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 200;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach((link) => {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (
                currentSection &&
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    updateActiveNavigation();


    /* =========================================
       REVEAL ANIMATION
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            `
            .service-card,
            .about-content,
            .about-visual,
            .package-card,
            .review-card,
            .contact-box,
            .faq-item
            `
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach((element) => {

            element.classList.add("reveal");

            revealObserver.observe(
                element
            );

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add(
                "revealed"
            );

        });

    }


    /* =========================================
       BACK TO TOP BUTTON
    ========================================= */

    const backToTop =
        document.createElement("button");


    backToTop.className =
        "back-to-top";


    backToTop.id =
        "backToTop";


    backToTop.type =
        "button";


    backToTop.setAttribute(
        "aria-label",
        "العودة إلى أعلى الصفحة"
    );


    backToTop.innerHTML =
        '<i class="fa-solid fa-arrow-up"></i>';


    document.body.appendChild(
        backToTop
    );


    function updateBackToTop() {

        if (
            window.scrollY > 500
        ) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );


    updateBackToTop();


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );


    /* =========================================
       WHATSAPP
    ========================================= */

    const whatsappButtons =
        document.querySelectorAll(
            ".whatsapp"
        );


    whatsappButtons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                if (!WHATSAPP_NUMBER) {

                    showContactMessage(
                        "يرجى إضافة رقم الواتساب في ملف script.js أولاً."
                    );

                    return;

                }


                const message =
                    "مرحبًا، أريد الاستفسار عن الخدمات والباقات المتاحة.";


                const whatsappURL =
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    });


    /* =========================================
       PHONE
    ========================================= */

    const phoneButtons =
        document.querySelectorAll(
            ".phone"
        );


    phoneButtons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                if (!PHONE_NUMBER) {

                    event.preventDefault();

                    showContactMessage(
                        "يرجى إضافة رقم الهاتف في ملف script.js أولاً."
                    );

                    return;

                }


                button.setAttribute(
                    "href",
                    `tel:${PHONE_NUMBER}`
                );

            }
        );

    });


    /* =========================================
       PACKAGE BUTTONS
    ========================================= */

    const packageButtons =
        document.querySelectorAll(
            ".package-btn"
        );


    packageButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const packageCard =
                    button.closest(
                        ".package-card"
                    );


                if (!packageCard) return;


                const packageName =
                    packageCard.querySelector(
                        ".package-name"
                    );


                if (!packageName) return;


                const selectedPackage =
                    packageName.textContent.trim();


                if (!WHATSAPP_NUMBER) {

                    return;

                }


                const message =
                    `مرحبًا، أرغب في الاستفسار عن ${selectedPackage}.`;


                const whatsappURL =
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    });


    /* =========================================
       SERVICE BUTTONS
    ========================================= */

    const serviceButtons =
        document.querySelectorAll(
            ".service-card a"
        );


    serviceButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const serviceCard =
                    button.closest(
                        ".service-card"
                    );


                if (!serviceCard) return;


                const serviceName =
                    serviceCard.querySelector(
                        "h3"
                    );


                if (!serviceName) return;


                const selectedService =
                    serviceName.textContent.trim();


                if (!WHATSAPP_NUMBER) {

                    return;

                }


                const message =
                    `مرحبًا، أريد الاستفسار عن خدمة ${selectedService}.`;


                const whatsappURL =
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    });


    /* =========================================
       CURRENT YEAR
    ========================================= */

    const yearElement =
        document.getElementById(
            "currentYear"
        );


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =========================================
       CONTACT MESSAGE
    ========================================= */

    function showContactMessage(message) {

        const oldMessage =
            document.querySelector(
                ".contact-message"
            );


        if (oldMessage) {

            oldMessage.remove();

        }


        const messageElement =
            document.createElement("div");


        messageElement.className =
            "contact-message";


        messageElement.textContent =
            message;


        messageElement.style.cssText = `
            margin-top: 18px;
            padding: 12px 18px;
            border-radius: 12px;
            background: rgba(215,181,90,0.10);
            border: 1px solid rgba(215,181,90,0.35);
            color: #f0d98a;
            text-align: center;
            font-size: 14px;
        `;


        const contactButtons =
            document.querySelector(
                ".contact-buttons"
            );


        if (contactButtons) {

            contactButtons.after(
                messageElement
            );

        }


        setTimeout(() => {

            messageElement.remove();

        }, 5000);

    }


    /* =========================================
       HERO PARALLAX - LIGHT EFFECT
    ========================================= */

    const hero =
        document.querySelector(".hero");


    const heroCard =
        document.querySelector(".hero-card");


    if (
        hero &&
        heroCard &&
        window.innerWidth > 900
    ) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width -
                    0.5;


                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height -
                    0.5;


                heroCard.style.transform =
                    `perspective(1000px)
                     rotateY(${x * 5}deg)
                     rotateX(${y * -5}deg)`;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroCard.style.transform =
                    "";

            }
        );

    }


    /* =========================================
       ESC KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                navbar
            ) {

                navbar.classList.remove(
                    "show"
                );


                if (menuToggle) {

                    const icon =
                        menuToggle.querySelector(
                            "i"
                        );


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }

        }
    );


    /* =========================================
       PAGE READY
    ========================================= */

    document.body.classList.add(
        "page-loaded"
    );

});
