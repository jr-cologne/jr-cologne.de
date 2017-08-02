// Navigation //
var button = document.getElementById('hamburger-button');
var nav = document.getElementById('nav');
var links = document.querySelectorAll("nav li a");

button.addEventListener('click', toggleNav);

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", toggleNav);
}

function toggleNav() {
  nav.classList.toggle('open');
}

// Welcome Section Parallax Effect //
if ( matchMedia("only screen and (min-width: 1024px)").matches ) {
  var rellax = new Rellax('.rellax');
}
