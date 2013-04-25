$(document).ready(function() {
  console.log('jQuery is working');
  $('#contact_submit_btn').click(send_message);
  $('#contact_clear_btn').click(clear_contact_form)


  // initialize Stellar.js
  $.stellar();

  // initialize horizontal scrolling for portfolio
  $('#portfolio_container').stellar({
      horizontalScrolling:true
  });

  // initialize isotope.js
  $('#portfolio_container').isotope({
      filter: "*",
      itemSelector: '.polaroid',
      layoutMode: 'fitRows',
      containerStyle: { overflow: 'visible', position: 'relative'},
      animationOptions: {
        duration: 750,
        easing: 'linear',
        queue: false
      }
  });

  $('#portfolio_container').show();

  // cache some variables
  var links = $('.navigation').find('li');
  var slide = $('.slide');
  var button = $('.btn');
  var mywindow = $(window);
  var htmlbody = $('html,body');

  // Setup waypoints plugin
  slide.waypoint(function (event, direction) {
    dataslide = $(this).attr('data-slide');
    if(event === 'down') {
      $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
    }
    else {
      $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
    }
  });
  mywindow.scroll(function() {
    if (mywindow.scrollTop() === 0) {
      $('.navigation li[data-slide="1"]').addClass('active');
      $('.navigation li[data-slide="2"]').removeClass('active');
    }
  });

  function goToByScroll(dataslide) {
    htmlbody.animate({
      scrollTop: $('.slide[data-slide="'+ dataslide + '"]').offset().top
    }, 500, 'easeInOutQuint');
  }

  links.click(function(e) {
    e.preventDefault();
    dataslide = $(this).attr('data-slide');
    goToByScroll(dataslide);
  });

  button.click(function (e) {
    e.preventDefault();
    dataslide = $(this).attr('data-slide');
    goToByScroll(dataslide);
  });

});

function clear_contact_form() {
  console.log('clearing form...');
  $('#contact_first_name').val('');
  $('#contact_last_name').val('');
  $('#contact_email').val('');
  $('#contact_body').val('');
  return false;


}


function send_message(e) {
  e.preventDefault();
  console.log('send_message...');
  first_name = $('#contact_first_name').val();
  last_name = $('#contact_last_name').val();
  email = $('#contact_email').val();
  message = $('#contact_body').val();

  // make AJAX call to send message
  $.ajax({
    type: 'post',
    url: 'http://serene-eyrie-9750.herokuapp.com/',
    dataType: 'script',
    data: {first_name:first_name,last_name:last_name, email: email, message: message}
  }).done();

  process_email();



}

function process_email(e) {
  alert('Thanks! Your message has been sent');
  clear_contact_form();
}



function horizontalScroll(e) {
  console.log('got here - horizontal scroll');
  e.preventDefault();
  $(this).attr('data-slide');
  slide = $(this).parent().parent().parent().parent().parent();
  slide
}




