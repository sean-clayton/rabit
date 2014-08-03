jQuery(function($) {

  /* ============================================================ */
  /* Responsive Videos */
  /* ============================================================ */

  $(".post-content").fitVids();

  /* ============================================================ */
  /* Scroll To Top */
  /* ============================================================ */

  $('.js-jump-top').on('click', function(e) {
    e.preventDefault();

    $('html, body').animate({'scrollTop': 0});
  });

  /* ============================================================ */
  /* Ajax Loading */
  /* ============================================================ */

  var History = window.History;
  var loading = false;
  var showIndex = false;
  var $ajaxContainer = $('#ajax-container');
  var $postIndex = $('#post-index');

  // Initially hide the index and show the latest post
  $postIndex.show();

  // Show the index if the url has "page" in it (a simple
  // way of checking if we're on a paginated page.)
  if (window.location.pathname.indexOf('page') === 1 || window.location.pathname.indexOf('tag') === 1) {
    $postIndex.show();
  }

  // Check if history is enabled for the browser
  if ( ! History.enabled) {
    return false;
  }

  History.Adapter.bind(window, 'statechange', function() {
    var State = History.getState();

    // Get the requested url and replace the current content
    // with the loaded content
    $.get(State.url, function(result) {
      var $html = $(result);
      var $newContent = $('#ajax-container', $html).contents();

      // Set the title to the requested urls document title
      document.title = $html.filter('title').text();

      $('html, body').animate({'scrollTop': 0});

      $ajaxContainer.fadeOut(500, function() {
        $postIndex = $newContent.filter('#post-index');

        // Re run fitvid.js
        $newContent.fitVids();

        $ajaxContainer.html($newContent);
        $ajaxContainer.fadeIn(500);

        hljs.initHighlighting.called = false;
        hljs.initHighlighting();

        NProgress.done();

        loading = false;
        showIndex = false;
      });
    });
  });

  $('body').on('click', '.js-ajax-link, .pagination a, .post-tags a', function(e) {
    e.preventDefault();

    if (loading === false) {
      var currentState = History.getState();
      var url = $(this).attr('href');
      var title = $(this).attr('title') || null;

      // If the requested url is not the current states url push
      // the new state and make the ajax call.
      if (url !== currentState.url.replace(/\/$/, "")) {
        loading = true;

        // Check if we need to show the post index after we've
        // loaded the new content
        if ($(this).hasClass('js-show-index') || $(this).parent('.pagination').length > 0) {
          showIndex = true;
        }

        NProgress.start();

        History.pushState({}, title, url);
      } else {
        // Swap in the latest post or post index as needed
        if ($(this).hasClass('js-show-index')) {
          $('html, body').animate({'scrollTop': 0});

          NProgress.start();
        }
        }
      }
    }
  });
});
