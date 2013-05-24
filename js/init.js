function addtionload() {
  scrollImfmat = oftenUse.getScroll();
  scrollL = scrollImfmat.l;
  scrollW = scrollImfmat.w;
  newpage_width = (style_cf.story_width+style_cf.story_marginright)*window.count;
  if(scrollL + document.body.clientWidth > scrollW - newpage_width*2) {
    $('.xreader').css('width',(parseInt($('.xreader').css('width')) + newpage_width) + 'px');
    window.begin += window.count;
    ajaxcall.GetIntroduces();
  }
}

// mouse wheel scroll for safari
function handle(delta) {
  var iAantalPixels = 75;
  if (delta < 0 ) {
    addtionload();
    window.scrollBy(iAantalPixels, 0);
  }
  else {
    window.scrollBy(-iAantalPixels, 0);
  }
}

function wheel(event){
  var delta = 0;
  if (!event) {
    event = window.event;
  }
  if (event.wheelDelta) {
    delta = event.wheelDelta/120;
    if (window.opera) {
      delta = -delta;
    }
  } else if (event.detail) {
    delta = -event.detail/3;
  }
  if (delta) {
    handle(delta);
  }
}

// Initialization code
if (window.addEventListener)
  window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;
ajaxcall.firstGetNewestID();