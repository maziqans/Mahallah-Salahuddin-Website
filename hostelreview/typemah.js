// Add this JavaScript to your existing script.js file or create a new one
var slideIndex = 1;
      showSlide(slideIndex);

      function changeSlide(n) {
        showSlide((slideIndex += n));
      }

      function showSlide(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");

        if (n > slides.length) {
          slideIndex = 1;
        }

        if (n < 1) {
          slideIndex = slides.length;
        }

        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }

        slides[slideIndex - 1].style.display = "block";
      }


