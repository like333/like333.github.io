  var arr = ['护', '染', '烫', '套', '洗', '剪'];
  var mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      pagination: '.swiper-pagination',
      paginationClickable: true,
      centeredSlides: true,
      slidesPerView: "auto",
      centeredSlides: true,
      paginationBulletRender: function(swiper, index, className) {
          return '<span class="' + className + '">' + arr[index] + '</span>';
      },

      watchSlidesVisibility: true,
      onProgress: function(swiper, progress) {
          for (var i = 0; i < swiper.slides.length; i++) {
              var slide = swiper.slides[i];
              var es = slide.style;
              var sca = 1 - Math.min(Math.abs(0.2 * slide.progress), 1);

              es.opacity = 1 - Math.min(Math.abs(slide.progress / 2), 1);

              es.webkitTransform = es.transform = "translate3d(0px,0," + -Math.abs(100 * slide.progress) + "px)";
              es.webkitTransform = es.transform = "scale(" + sca + ")";
          }
      },
      onSetTransition: function(swiper, transition) {
          for (var c = 0; c < swiper.slides.length; c++)
              es = swiper.slides[c].style,
              es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = transition + "ms"
      }


  });