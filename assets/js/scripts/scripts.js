jQuery(function($) {

  InstantClick.init(50, true);

  $('.js-jump-top').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({'scrollTop': 0});
  });

});
