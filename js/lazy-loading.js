$(document).ready(function() { 
var cHeight = 0;


$(document).on('slide.bs.carousel', '.kharron', function(e) {

  var $nextImage = $(e.relatedTarget).find('iframe');

  $activeItem = $('.active.item', this);

  // prevents the slide decrease in height
  if (cHeight == 0) {
    cHeight = $(this).height();
    $activeItem.next('.item').height(cHeight);
  }

  // prevents the loaded image if it is already loaded
  var src = $nextImage.data('lazy-load-src');

  if (typeof src !== "undefined" && src != "") {
    $nextImage.attr('src', src)
    $nextImage.data('lazy-load-src', '');
  }
});



});
