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
   }); // <-- ЦЯ ДУЖКА БУЛА ВІДСУТНЯ!


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


   /*----------------------------------------------------*/
   /* Modern Achievements Slider
   ------------------------------------------------------*/
   $(document).ready(function() {
      // Check if slider exists on page
      if ($('#achievementSlides').length === 0) return;

      const slidesContainer = $('#achievementSlides');
      const slides = $('.achievement-slide');
      const prevBtn = $('#prevBtn');
      const nextBtn = $('#nextBtn');
      const navContainer = $('#sliderNav');

      let currentSlide = 0;
      const totalSlides = slides.length;
      let autoPlayInterval;
      let isTransitioning = false;

      // Create navigation dots
      for (let i = 0; i < totalSlides; i++) {
         const dot = $('<button>')
            .addClass('nav-dot')
            .attr('aria-label', 'Go to slide ' + (i + 1));
         if (i === 0) dot.addClass('active');
         navContainer.append(dot);
      }

      const navDots = $('.nav-dot');

      // Update slider function
      function updateSlider(animate) {
         if (typeof animate === 'undefined') animate = true;
         if (isTransitioning) return;

         if (animate) {
            isTransitioning = true;
            setTimeout(function() { isTransitioning = false; }, 600);
         }

         // Update slide position
         const translateX = -currentSlide * 100;
         slidesContainer.css({
            'transform': 'translateX(' + translateX + '%)',
            '-webkit-transform': 'translateX(' + translateX + '%)',
            '-moz-transform': 'translateX(' + translateX + '%)',
            '-ms-transform': 'translateX(' + translateX + '%)',
            '-o-transform': 'translateX(' + translateX + '%)'
         });

         // Update navigation dots
         navDots.removeClass('active');
         navDots.eq(currentSlide).addClass('active');
      }

      // Go to specific slide
      function goToSlide(slideIndex) {
         if (slideIndex >= 0 && slideIndex < totalSlides) {
            currentSlide = slideIndex;
            updateSlider();
         }
      }

      // Next slide
      function nextSlide() {
         currentSlide = (currentSlide + 1) % totalSlides;
         updateSlider();
      }

      // Previous slide
      function prevSlide() {
         currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
         updateSlider();
      }

      // Auto-play functionality
      function startAutoPlay() {
         stopAutoPlay();
         autoPlayInterval = setInterval(nextSlide, 5000);
      }

      function stopAutoPlay() {
         if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
         }
      }

      // Event listeners
      nextBtn.on('click', function() {
         nextSlide();
         startAutoPlay();
      });

      prevBtn.on('click', function() {
         prevSlide();
         startAutoPlay();
      });

      // Navigation dots click
      navDots.on('click', function() {
         const index = $(this).index();
         goToSlide(index);
         startAutoPlay();
      });

      // Pause on hover
      const sliderWrapper = $('.achievements-slider-wrapper');
      sliderWrapper.on('mouseenter', stopAutoPlay);
      sliderWrapper.on('mouseleave', startAutoPlay);

      // Touch/swipe support
      let touchStartX = 0;
      let touchEndX = 0;
      let isDragging = false;

      slidesContainer.on('touchstart', function(e) {
         touchStartX = e.originalEvent.changedTouches[0].screenX;
         isDragging = true;
      });

      slidesContainer.on('touchmove', function(e) {
         if (!isDragging) return;
         touchEndX = e.originalEvent.changedTouches[0].screenX;
      });

      slidesContainer.on('touchend', function() {
         if (!isDragging) return;
         isDragging = false;

         const swipeThreshold = 50;
         const diff = touchStartX - touchEndX;

         if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
               nextSlide();
            } else {
               prevSlide();
            }
            startAutoPlay();
         }
      });

      // Initialize auto-play
      startAutoPlay();

      // Initialize first slide
      updateSlider(false);
   });

})(jQuery);