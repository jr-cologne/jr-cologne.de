$(document).ready(function () {
  if ( matchMedia("only screen and (min-width: 1200px)").matches ) {
    var w = $(window);
    var welcomeHeadingContainer = $('#welcome-heading-container');

    w.scroll(function () {
      parallax(welcomeHeadingContainer, '', 0.4);
    });
  }

  function parallax(element, operator, multiplier) {
    var wScroll = w.scrollTop();

    $(element).css('transform', 'translateY(' + operator + (wScroll * multiplier) + 'px)');
  }
});
