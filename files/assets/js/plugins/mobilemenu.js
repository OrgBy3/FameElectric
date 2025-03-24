;(function($) {
  $(document).ready(function() {

    // Mobile wrap
    const mobile_nav_open = $('.mobile-nav-icon');
    const mobile_sidebar = $('.mobile-sidebar');
    const mobile_nav_close = $('.menu-close');

    mobile_nav_open.on('click', function(){
      mobile_sidebar.addClass('mobile-menu-active');
    });

    mobile_nav_close.on('click', function(){
      mobile_sidebar.removeClass('mobile-menu-active');
    });

    // Hide menu when clicking any menu link
    $('.mobile-nav a').on('click', function(){
      mobile_sidebar.removeClass('mobile-menu-active');
    });

    // Mobile menus
    $('.mobile-nav a').each(function(){
      var href = $(this).attr('href');
      if(href === '#'){
        $(this).addClass('hash-nav');
      } else {
        $(this).removeClass('hash-nav');
      }
    });

    // Mobile menus markup
    $.fn.menumarker = function(options){
      var mobile_menu = $(this),
      settings = $.extend({
        format: "dropdown",
        sticky: false
      }, options);

      return this.each(function(){
        mobile_menu.find('li ul').parent().addClass('has-sub');
        var multiTg = function(){
          mobile_menu.find('.hash-nav').parent().addClass('hash-has-sub');
          mobile_menu.find(".has-sub").prepend('<span class="submenu-button"><em></em></span>');
          mobile_menu.find('.submenu-button').on('click', function(){
            $(this).toggleClass('submenu-opened');
            if ($(this).siblings('ul').hasClass('open-sub')) {
              $(this).siblings('ul').removeClass('open-sub').hide();
            } else {
              $(this).siblings('ul').addClass('open-sub').slideToggle();
            }
          });
        };

        if (settings.format === 'multitoggle') multiTg();
        else mobile_menu.addClass('dropdown');

        if (settings.sticky === true) mobile_menu.css('position', 'fixed');

        var resizeFix = function () {
          if ($(window).width() > 991) {
            mobile_menu.find('ul').show();
            mobile_menu.find('ul.sub-menu').hide();
          }
        };

        resizeFix();
        return $(window).on('resize', resizeFix);
      });
    };

    $('.mobile-nav').menumarker({
      format: "multitoggle"
    });

  });
})(jQuery);
