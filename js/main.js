/*---------------------------------------------------------------------------------
/* Main JS
/*-----------------------------------------------------------------------------------*/

(function($) {

   "use strict";

   /*---------------------------------------------------- */
   /* Preloader
   ------------------------------------------------------ */
   $(window).on('load', function() {
      // Fade out the loading animation
      $("#loader").fadeOut("slow", function(){
         // Fade out the preloader div that covers the website
         $("#preloader").delay(300).fadeOut("slow");
      });
   });


   /*----------------------------------------------------*/
   /* Flexslider Initialization
   /*----------------------------------------------------*/
   $(window).on('load', function() {
      // Hero Slider
      $('#hero-slider').flexslider({
         namespace: "flex-",
         controlsContainer: ".hero-container",
         animation: 'fade',
         controlNav: true,
         directionNav: false,
         smoothHeight: true,
         slideshowSpeed: 7000,
         animationSpeed: 600,
         randomize: false,
         before: function(slider){
            // Remove animation classes before slide change
            $(slider).find(".animated").each(function(){
               $(this).removeAttr("class");
            });
         },
         start: function(slider){
            // Add animation classes when the slider starts
            $(slider).find(".flex-active-slide")
               .find("h1").addClass("animated fadeInDown show")
               .next().addClass("animated fadeInUp show");

            $(window).trigger('resize');
         },
         after: function(slider){
            // Add animation classes after slide change
            $(slider).find(".flex-active-slide")
               .find("h1").addClass("animated fadeInDown show")
               .next().addClass("animated fadeInUp show");
         }
      });

      // Testimonial Slider
      $('#testimonial-slider').flexslider({
         namespace: "flex-",
         controlsContainer: "",
         animation: 'slide',
         controlNav: true,
         directionNav: false,
         smoothHeight: true,
         slideshowSpeed: 7000,
         animationSpeed: 600,
         randomize: false,
      });
   });


   /*----------------------------------------------------*/
   /* Adjust Primary Navigation Background Opacity
   ------------------------------------------------------*/
   $(window).on('scroll', function() {
      let headerHeight = $('header').height();
      let scrollPosition = $(window).scrollTop();
      let header = $('#main-header');

      if ((scrollPosition > headerHeight + 30) && ($(window).outerWidth() > 768)) {
         header.addClass('sus');  // Add opacity class when scrolling down
      } else {
         header.removeClass('sus'); // Remove opacity class when scrolling up
      }
   });


   /*----------------------------------------------------*/
   /* Highlight the current section in the navigation bar
   ------------------------------------------------------*/
   let sections = $("section"),
       navigation_links = $("#nav-wrap a");

   sections.waypoint({
      handler: function(direction) {
         let active_section = $('section#' + this.element.id);
         if (direction === "up") active_section = active_section.prev();
         let active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');
         navigation_links.parent().removeClass("current");
         active_link.parent().addClass("current");
      },
      offset: '25%'  // Trigger when the section is 25% from the top
   });


   /*----------------------------------------------------*/
   /* FitText Settings
   ------------------------------------------------------ */
   setTimeout(function() {
      $('#hero-slider h1').fitText(1, { minFontSize: '30px', maxFontSize: '49px' });
   }, 100);


   /*-----------------------------------------------------*/
   /* Mobile Menu
   ------------------------------------------------------ */
   let menu_icon = $("<span class='menu-icon'>Menu</span>");
   let toggle_button = $("<a>", {
      id: "toggle-btn",
      html : "",
      title: "Menu",
      href : "#"
   });
   let nav_wrap = $('nav#nav-wrap');
   let nav = $("ul#nav");

   /* If JS is enabled, remove the two a.mobile-btns
   and dynamically prepend a.toggle-btn to #nav-wrap */
   nav_wrap.find('a.mobile-btn').remove();
   toggle_button.append(menu_icon);
   nav_wrap.prepend(toggle_button);

   toggle_button.on("click", function(e) {
      e.preventDefault();
      nav.slideToggle("fast");
   });

   if (toggle_button.is(':visible')) nav.addClass('mobile');
   $(window).resize(function() {
      if (toggle_button.is(':visible')) nav.addClass('mobile');
      else nav.removeClass('mobile');
   });

   $('ul#nav li a').on("click", function() {
      if (nav.hasClass('mobile')) nav.fadeOut('fast');
   });


   /*----------------------------------------------------*/
   /* Smooth Scrolling for Anchor Links
   ------------------------------------------------------ */
   $('.smoothscroll').on('click', function (e) {
      e.preventDefault();
      let target = this.hash,
          $target = $(target);

      $('html, body').stop().animate({
         'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
         window.location.hash = target;
      });
   });


   /*----------------------------------------------------*/
   /* Modal Popup Initialization
   ------------------------------------------------------*/
   $('.item-wrap a').magnificPopup({
      type: 'inline',
      fixedContentPos: false,
      removalDelay: 300,
      showCloseBtn: false,
      mainClass: 'mfp-fade'
   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
      e.preventDefault();
      $.magnificPopup.close();
   });


   /*----------------------------------------------------*/
   /* Placeholder Plugin Settings
   ------------------------------------------------------ */
   $('input, textarea').placeholder();


   /*----------------------------------------------------*/
   /* Contact Form Validation and Submission
   ------------------------------------------------------*/
   $('#contactForm').validate({
      submitHandler: function(form) {
         let sLoader = $('#submit-loader');

         $.ajax({
            type: "POST",
            url: "inc/sendEmail.php",
            data: $(form).serialize(),
            beforeSend: function() {
               sLoader.fadeIn();
            },
            success: function(msg) {
               if (msg == 'OK') {
                  sLoader.fadeOut();
                  $('#message-warning').hide();
                  $('#contactForm').fadeOut();
                  $('#message-success').fadeIn();
               } else {
                  sLoader.fadeOut();
                  $('#message-warning').html(msg);
                  $('#message-warning').fadeIn();
               }
            },
            error: function() {
               sLoader.fadeOut();
               $('#message-warning').html("Something went wrong. Please try again.");
               $('#message-warning').fadeIn();
            }
         });
      }
   });

})(jQuery);
