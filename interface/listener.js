$(function () {
  window.onload = (e) => {
    window.addEventListener("message", (event) => {
      var item = event.data;
      if (item !== undefined && item.type === "ui") {
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
        $("#speed").text(item.speed);
        $(".fuel").text('Fuel : ' + item.fuel + ' %');
        if (item.fuel > 59) {
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
