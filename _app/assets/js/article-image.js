// Article Image Parallax Effect //
var articleImage = document.getElementById('article-image');

fixArticleImagePosition();

document.addEventListener('scroll', articleImageParallax);

window.addEventListener('resize', function () {
  disableArticleImageEffects();
  fixArticleImagePosition();
  articleImageParallax();
});

function disableArticleImageEffects() {
  if (window.innerWidth <= 1024) {
    articleImage.style.backgroundPosition = 'center center';
  }
}

function fixArticleImagePosition() {
  if (window.innerWidth > 1024) {
    var articleImagePositionTop = articleImage.getBoundingClientRect().top;

    articleImage.style.backgroundPosition = 'center ' + articleImagePositionTop + 'px';
  }
}

function articleImageParallax() {
  if (window.innerWidth > 1024) {
    var scrollY = window.scrollY || window.pageYOffset;
    var articleImagePositionTop = articleImage.getBoundingClientRect().top;
    var parallaxValue = articleImagePositionTop - scrollY / 2;

    articleImage.style.backgroundPosition = 'center ' + parallaxValue + 'px';
  }
}
