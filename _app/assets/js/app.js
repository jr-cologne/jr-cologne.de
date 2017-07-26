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
