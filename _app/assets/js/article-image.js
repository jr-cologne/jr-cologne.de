// Article Image Parallax Effect //
var articleImage = document.getElementById('article-image');

var specificBackgroundPosition = false;

if (articleImage.style.backgroundPosition) {
  specificBackgroundPosition = true;
  var wantedHorizontalBackgroundPosition = articleImage.style.backgroundPosition.split(' ')[0];
}

fixArticleImagePosition();

document.addEventListener('scroll', articleImageParallax);

window.addEventListener('resize', function () {
  disableArticleImageEffects();
  fixArticleImagePosition();
  articleImageParallax();
});

function disableArticleImageEffects() {
  if (window.innerWidth <= 1024) {
    if (!specificBackgroundPosition) {
      articleImage.style.backgroundPosition = 'center center';
    } else {
      articleImage.style.backgroundPosition = wantedHorizontalBackgroundPosition + ' center';
    }
  }
}

function fixArticleImagePosition() {
  if (window.innerWidth > 1024) {
    var articleImagePositionTop = articleImage.getBoundingClientRect().top;

    if (!specificBackgroundPosition) {
      articleImage.style.backgroundPosition = 'center ' + articleImagePositionTop + 'px';
    } else {
      articleImage.style.backgroundPosition = wantedHorizontalBackgroundPosition + ' ' + articleImagePositionTop + 'px';
    }
  }
}

function articleImageParallax() {
  if (window.innerWidth > 1024) {
    var scrollY = window.scrollY || window.pageYOffset;
    var articleImagePositionTop = articleImage.getBoundingClientRect().top;
    var parallaxValue = articleImagePositionTop - scrollY / 2;

    if (!specificBackgroundPosition) {
      articleImage.style.backgroundPosition = 'center ' + parallaxValue + 'px';
    } else {
      articleImage.style.backgroundPosition = wantedHorizontalBackgroundPosition + ' ' + parallaxValue + 'px';
    }
  }
}
