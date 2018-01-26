$(document).ready(function () {
  var root = $('html, body');

  $('a[href^="#"]').on('click', function() {
    smoothScroll(this);
  });

  function smoothScroll(anchor) {
    if (anchor.hash) {
      $(root).animate({
        scrollTop: $(anchor.hash).offset().top
      }, 500);

      window.location.hash = anchor.hash;

      return false;
    }
  }
});
