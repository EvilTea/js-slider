let $slidesItem = $('.slide-item');
let $indContainer = $('.indicators');
let $indItems = $('.indicator-item')
let $btnPausePlay = $('#pause-play');
let $btnPrev = $('.controls__prev');
let $btnNext = $('.controls__next');
let currentSlide = 0;
let playStatus = true;
let timerId = null;
let timerInterval = 1000;

const FA_PLAY = '<i class="fa fa-play" aria-hidden="true"></i>';
const FA_PAUSE = '<i class="fa fa-pause" aria-hidden="true"></i>';
const SPACE = ' ';
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';

let goToSlide = (n) => {
  $($slidesItem[currentSlide]).toggleClass('active');
  $($indItems[currentSlide]).toggleClass('active');
  currentSlide = (n + $slidesItem.length) % $slidesItem.length;
  $($slidesItem[currentSlide]).toggleClass('active');
  $($indItems[currentSlide]).toggleClass('active');
}

let goToNextSlide = () => {
  goToSlide(currentSlide + 1);
}

let goToPrevSlide = () => {
  goToSlide(currentSlide - 1);
}

let slideInterval = setInterval(goToNextSlide,timerInterval);

let pauseSlideShow = () => {
  $btnPausePlay.html(FA_PLAY);
  playStatus = !playStatus;
  clearInterval(slideInterval);
}

let playSlideShow = () => {
  $btnPausePlay.html(FA_PAUSE);
  playStatus = !playStatus;
  slideInterval = setInterval(goToNextSlide, timerInterval);
}

let pausePlaySlideShow = () =>  playStatus ? pauseSlideShow() : playSlideShow(); 


let clickPrevBtn = () => {
  pauseSlideShow();
  goToPrevSlide();
}

let clickNextBtn = () => {
  pauseSlideShow();
  goToNextSlide();
}

$btnPausePlay.on('click', pausePlaySlideShow);
$btnPrev.on('click', clickPrevBtn);
$btnNext.on('click', clickNextBtn);


let clickIndicatorItem = (event) => {
     pauseSlideShow();
     goToSlide(+event.target.getAttribute('data-slide-to'));
  }

$indContainer.on('click', clickIndicatorItem);


let keyControlsBtn = (event) => {
  if (event.key === SPACE) pausePlaySlideShow();
  if (event.key === LEFT_ARROW) clickPrevBtn();
  if (event.key === RIGHT_ARROW) clickNextBtn();
}

$(document).on('keydown', keyControlsBtn);