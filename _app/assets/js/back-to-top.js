var documentHeight = document.body.scrollHeight;

if (documentHeight > 1800) {
  var backToTopButton = document.getElementById('back-to-top-button');
  var backToTopButtonHeight = backToTopButton.clientHeight;
  var footer = document.getElementsByClassName('footer')[0];

  if ((window.scrollY || window.pageYOffset) > 1400) {
    backToTopButton.classList.add('show');
  }

  document.addEventListener('scroll', show);
}

function show() {
  var scrollY = window.scrollY || window.pageYOffset;

  if (scrollY > 1400 && backToTopButton.getBoundingClientRect().top + backToTopButtonHeight < footer.getBoundingClientRect().top - 80) {
    if (!backToTopButton.classList.contains('show')) {
      backToTopButton.classList.add('show');
    }
  } else {
    if (backToTopButton.classList.contains('show')) {
      backToTopButton.classList.remove('show');
    }
  }
}
