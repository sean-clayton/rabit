jQuery(function($) {

  InstantClick.on('change', function() {
    ga('require', 'displayfeatures');
    ga('send', 'pageview');
    $(document).ready(function() {
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    });
  });

  InstantClick.init(50, true);

  $('.js-jump-top').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({'scrollTop': 0});
  });

});
