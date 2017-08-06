// Article Image Parallax Effect //
if ( matchMedia("only screen and (min-width: 1024px)").matches ) {
  var articleImage = document.getElementById('article-image');
  var articleImageHeight = articleImage.clientHeight;
  var articleImagePositionTop = articleImage.getBoundingClientRect().top;

  articleImage.style.backgroundPosition = 'center ' + articleImagePositionTop + 'px';

  document.addEventListener('scroll', articleImageParallax);

  function articleImageParallax() {
    var scrollY = window.scrollY || window.pageYOffset;
    var articleImagePositionTop = articleImage.getBoundingClientRect().top;
    var parallaxValue = articleImagePositionTop - scrollY / 2;

    articleImage.style.backgroundPosition = 'center ' + parallaxValue + 'px';
  }
}
