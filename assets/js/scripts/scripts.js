jQuery(function($) {

  $(function() {
    InstantClick.init(true);
  });

  $(".post-content").fitVids();

  $('.js-jump-top').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({'scrollTop': 0});
  });

});
