$(function () {
  window.onload = (e) => {
    window.addEventListener("message", (event) => {
      var item = event.data;
      if (item !== undefined && item.type === "ui") {
        /* if the display is true, it will show */
        if (item.display === true) {
          $(".animate__animated").removeClass('animate__rotateOutUpRight animate__fadeOut');
          $(".animate__animated").addClass('animate__rotateInDownRight animate__fadeIn');
          $("#container").show();
        } else {
          $(".animate__animated").removeClass('animate__rotateInDownRight animate__fadeIn');
          $(".animate__animated").addClass('animate__fadeOut animate__rotateOutUpRight');
          setTimeout(
            function() 
            {
              $("#container").hide();
            }, 500);
        }
      } else if (item !== undefined && item.type === "speed") {
        $(".gauge-a").css({ transform: 'rotate(' + (item.percent * 0.005) + 'turn)', transition: 'transform 1s linear'});
        $("#speed").text(item.value);
      } else if (item !== undefined && item.type === "fuel") {
        $(".fuel").text('Fuel : ' + item.value + ' %');
        if (item.value > 60) {
          $(".fuel").removeClass('glow-red');
          $(".fuel").addClass('glow-green');
        } else {
          $(".fuel").removeClass('glow-green');
          $(".fuel").addClass('glow-red');
        }
      }
    });
  };
});
