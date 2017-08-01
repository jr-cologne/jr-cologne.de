// Navigation //
var button = document.getElementById('hamburger-button');
var nav = document.getElementById('nav');
var links = document.querySelectorAll("nav li a");

button.addEventListener('click', toggleNav);
links.forEach( function (element) {
  element.addEventListener("click", toggleNav)
} );

function toggleNav() {
  nav.classList.toggle('open');
}

// Welcome Section Parallax Effect //
var welcomeSection = document.getElementById('welcome-section');
var welcomeSectionHeight = welcomeSection.clientHeight;
var welcomeHeadingContainer = document.querySelector('#welcome-section .welcome-heading-container');

document.addEventListener('scroll', welcome_parallax);

function welcome_parallax() {
  var windowHeight = window.innerHeight;
  var scrollY = window.scrollY || window.pageYOffset;

  var welcomeSectionPosition = welcomeSection.getBoundingClientRect().top + scrollY + welcomeSectionHeight;

  if (scrollY <= welcomeSectionPosition) {
    welcomeHeadingContainer.style.transform = 'translateY(calc(-50% + ' + scrollY / 10 + '%))';
  }

  return false;
}
