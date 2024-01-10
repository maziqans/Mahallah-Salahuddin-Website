$(function(){

   'use strict';

   var isMobile = {
      Android: function() {
         return navigator.userAgent.match(/Android/i);
      },
         BlackBerry: function() {
         return navigator.userAgent.match(/BlackBerry/i);
      },
         iOS: function() {
         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
         Opera: function() {
         return navigator.userAgent.match(/Opera Mini/i);
      },
         Windows: function() {
         return navigator.userAgent.match(/IEMobile/i);
      },
         any: function() {
         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
   };

	// Main Menu Superfish
   var mainMenu = function() {

      $('#webpage-primary-menu').superfish({
         delay: 0,
         animation: {
            opacity: 'show'
         },
         speed: 'fast',
         cssArrows: true,
         disableHI: true
      });

   };

   // Offcanvas and cloning of the main menu
   var offcanvas = function() {

      var $clone = $('#webpage-menu-wrap').clone();
      $clone.attr({
         'id' : 'offcanvas-menu'
      });
      $clone.find('> ul').attr({
         'class' : '',
         'id' : ''
      });

      $('#webpage-page').prepend($clone);

      // click the burger
      $('.js-webpage-nav-toggle').on('click', function(){

         if ( $('body').hasClass('webpage-offcanvas') ) {
            $('body').removeClass('webpage-offcanvas');
            $(this).removeClass('active');
         } else {
            $('body').addClass('webpage-offcanvas');
            $(this).addClass('active');
         }

      });

      $('#offcanvas-menu').css('height', $(window).height());

      $(window).resize(function(){
         var w = $(window);


         $('#offcanvas-menu').css('height', w.height());

         if ( w.width() > 769 ) {
            if ( $('body').hasClass('webpage-offcanvas') ) {
               $('body').removeClass('webpage-offcanvas');
            }
         }

      });   

   }
   

   // Click outside of the Mobile Menu
   var mobileMenuOutsideClick = function() {
      $(document).click(function (e) {
       var container = $("#offcanvas-menu, .js-webpage-nav-toggle");
       if (!container.is(e.target) && container.has(e.target).length === 0) {
         if ( $('body').hasClass('webpage-offcanvas') ) {
            $('body').removeClass('webpage-offcanvas');
         }
       }
      });
   };

   var counter = function() {
      $('.js-counter').countTo({
         formatter: function (value, options) {
         return value.toFixed(options.decimals);
       },
      });
   };

   var contentWayPoint = function() {
      var i = 0;
      $('.animate-box').waypoint( function( direction ) {

         if( direction === 'down' && !$(this.element).hasClass('animated') ) {
            
            i++;

            $(this.element).addClass('item-animate');
            setTimeout(function(){

               $('body .animate-box.item-animate').each(function(k){
                  var el = $(this);
                  setTimeout( function () {
                     el.addClass('fadeInUp animated');
                     el.removeClass('item-animate');
                  },  k * 200, 'easeInOutExpo' );
               });
               
            }, 100);
            
         }

      } , { offset: '85%' } );
   };


   var fullHeight = function() {

      if ( !isMobile.any() ) {
         $('.js-fullheight').css('height', $(window).height() - $('#webpage-header').height());
         $(window).resize(function(){
            $('.js-fullheight').css('height', $(window).height() - $('#webpage-header').height());
         });
      }

   };

   // Update the Room options based on the Block and Level selected
   function updateRooms() {
      // Get selected block and level
      var selectedBlock = $('#blockSelect').val();
      var selectedLevel = $('#levelSelect').val();

      var roomOptions = generateRoomOptions(selectedBlock, selectedLevel);

      // Update the room select element
      var roomSelect = $('#roomSelect');
      roomSelect.empty(); // Clear existing options

      // Add new room options
      roomOptions.forEach(function(room) {
         roomSelect.append($('<option>', {
            value: room,
            text: room
         }));
      });
   }

   function generateRoomOptions(block, level) {
      var roomOptions = [];
      for (var i = 1; i <= 7; i++) {
         roomOptions.push(block + level + '.' + i);
      }
      return roomOptions;
   }


   //Date Picker

   $('#date-start, #date-end').datepicker();

   [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {  
      new SelectFx(el);
   } );


   // Live Time and Date API
   $(document).ready(function () {
      // Make an AJAX request to the WorldTimeAPI
      $.ajax({
          url: "http://worldtimeapi.org/api/timezone/Asia/Kuala_Lumpur",
          method: "GET",
          dataType: "json",
          success: function (data) {
              // Parse the datetime string into a Date object
              const dateTime = new Date(data.datetime);
  
              // Format the date and time
              const formattedDateTime = dateTime.toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  hour12: true
              });
  
              // Update the HTML element with the formatted date and time
              $("#live-time").text("Current Time: " + formattedDateTime);
          },
          error: function () {
              // Handle error if the request fails
              $("#live-time").text("Unable to fetch the current time.");
          }
      });
  });


   
   // Tabs

   var tabs = function() {
      $('#mahallah-facilities').css('height', $('.tab-content.active').height() + 600);

      $(window).resize(function(){
         $('#mahallah-facilities').css('height', $('.tab-content.active').height() + 600);
      });

      $('.tabs-nav > a').on('click', function(e){
         
         var tab = $(this).data('tab');

         $('.tabs-nav > a').removeClass('active');
         $(this).addClass('active');

         $('.tab-content').removeClass('active show');
         
         setTimeout(function(){
            $('.tab-content[data-tab-content="'+tab+'"]').addClass('active');
            $('#mahallah-facilities').css('height', $('.tab-content.active').height() + 600);
         }, 200);
         setTimeout(function(){
            $('.tab-content[data-tab-content="'+tab+'"]').addClass('show');
         }, 400);
         

         e.preventDefault();
      });
   };

   var sliderMain = function() {
      
      $('#webpage-hero .flexslider').flexslider({
         animation: "fade",
         slideshowSpeed: 5000,
         directionNav: true,
         start: function(){
            setTimeout(function(){
               $('.slider-text').removeClass('animated fadeInUp');
               $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
            }, 500);
         },
         before: function(){
            setTimeout(function(){
               $('.slider-text').removeClass('animated fadeInUp');
               $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
            }, 500);
         }

      });

      $('#webpage-hero .flexslider .slides > li').css('height', $(window).height());  
      $(window).resize(function(){
         $('#webpage-hero .flexslider .slides > li').css('height', $(window).height());  
      });

   };

   // Parallax
   var parallax = function() {
      $(window).stellar();
   };

   $('#blockSelect, #levelSelect').on('change', function() {
      updateRooms();
   });


   $(function(){
      sliderMain();
      tabs();
      mainMenu();
      offcanvas();
      contentWayPoint();
      mobileMenuOutsideClick();
      parallax();
      fullHeight();
      counter();
   });

});
	
	