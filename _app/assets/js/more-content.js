var moreContentToggle = document.getElementById('more-content');
var content = document.querySelector('.article-text .hidden');
var stateChanged = false;

moreContentToggle.addEventListener('click', function (event) {
  event.preventDefault();

  stateChanged = false;

  toggleMoreContent();
  changeContentToggle();
});

function toggleMoreContent() {
  content.classList.toggle('show');

  if (moreContentToggle.innerHTML == 'Einklappen') {
    moreContentToggle.innerHTML = 'Mehr lesen';
    stateChanged = true;
  }
}

function changeContentToggle() {
  moreContentToggle.classList.toggle('collapse');

  if (moreContentToggle.innerHTML == 'Mehr lesen' && !stateChanged) {
    moreContentToggle.innerHTML = 'Einklappen';
  }
}
