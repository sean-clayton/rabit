jQuery(function($) {
  $(document).ready(function() {

    ga('require', 'displayfeatures');
    ga('send', 'pageview');

    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  });

  $('.js-jump-top').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({'scrollTop': 0});
  });

});
