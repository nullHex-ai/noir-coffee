const menuNav = document.querySelector('.nav-menu');
const menuBlock = document.querySelector('.block-menu');

menuNav.addEventListener('click', function (event) {
    if (event.target.tagName !== 'A') {
        return;
    }

    event.preventDefault();

    const targetId = event.target.getAttribute('href');
    const target = document.querySelector(targetId);

    const targetPosition = target.getBoundingClientRect().top;
    const menuPosition = menuBlock.getBoundingClientRect().top;

    menuBlock.scrollTo({
        top: menuBlock.scrollTop + targetPosition - menuPosition - menuNav.offsetHeight,
        behavior: 'smooth'
    });
});

const mainNavLinks = document.querySelectorAll('.main-nav a');

const sections = document.querySelectorAll('#hero, #menu, #about, #contacts');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }

        mainNavLinks.forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(
            `.main-nav a[href="#${entry.target.id}"]`
        );

        if (activeLink) {
            activeLink.classList.add('active');
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => {
    observer.observe(section);
});