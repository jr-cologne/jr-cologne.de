// Article Image Parallax Effect //
var articleImage = document.getElementById('article-image');

if (articleImage.getAttribute('data-article-image-effect') != 'false') {
  var specificBackgroundPosition = false;

  if (articleImage.getAttribute('data-bg-pos-x')) {
    specificBackgroundPosition = true;
    var wantedHorizontalBackgroundPosition = articleImage.getAttribute('data-bg-pos-x');
  }

  fixArticleImagePosition();

  document.addEventListener('scroll', articleImageParallax);

  window.addEventListener('resize', function () {
    disableArticleImageEffects();
    fixArticleImagePosition();
    articleImageParallax();
  });

  function getWantedHorizontalBackgroundPosition() {
    switch (wantedHorizontalBackgroundPosition) {
      case 'start':
        return (window.innerWidth <= 1024) ? 'left' : articleImage.getBoundingClientRect().left + 'px';
      default:
        return wantedHorizontalBackgroundPosition;
    }
  }

  function disableArticleImageEffects() {
    if (window.innerWidth <= 1024) {
      if (!specificBackgroundPosition) {
        articleImage.style.backgroundPosition = 'center center';
      } else {
        articleImage.style.backgroundPosition = getWantedHorizontalBackgroundPosition() + ' center';
      }
    }
  }

  function fixArticleImagePosition() {
    if (window.innerWidth > 1024) {
      var articleImagePositionTop = articleImage.getBoundingClientRect().top;

      if (!specificBackgroundPosition) {
        articleImage.style.backgroundPosition = 'center ' + articleImagePositionTop + 'px';
      } else {
        articleImage.style.backgroundPosition = getWantedHorizontalBackgroundPosition() + ' ' + articleImagePositionTop + 'px';
      }
    } else if (specificBackgroundPosition && window.innerWidth <= 1024) {
      articleImage.style.backgroundPosition = getWantedHorizontalBackgroundPosition() + ' center';
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
        articleImage.style.backgroundPosition = getWantedHorizontalBackgroundPosition() + ' ' + parallaxValue + 'px';
      }
    }
  }
} else {
  articleImage.style.backgroundAttachment = 'scroll';
  articleImage.style.backgroundPosition = 'center center';
}
