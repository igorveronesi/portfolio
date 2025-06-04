;(function($) {

  'use strict'; // Using strict mode

  // Vertical lines
  $('body').append('<div class="l1"></div><div class="l2"></div><div class="l3"></div>')

  // Page transitions

  $('a[href!=#][data-toggle!=tab][data-toggle!=collapse][target!=_blank][class!=anchor]').addClass('smooth');

  $('.smooth-transition').animsition({
    linkElement: '.smooth',
    inDuration: 500,
    outDuration: 500,
  });

  $('html').on('click', function(e){
    $('.navigation, .nav-trigger').removeClass('tapped');
  });

  $('.nav-trigger').on('click', function(e){
    e.stopPropagation();
    $('.navigation').toggleClass('tapped');
    if($('.navigation').hasClass('tapped'))
      $('.nav-trigger').addClass('tapped');
    else
      $('.nav-trigger').removeClass('tapped');
  });

  $('.navigation li').on('click', function(e){
    e.stopPropagation();
    $(this).toggleClass('tapped');
  });

  // Grid functions

  var $grid = $('.grid');

  $grid.imagesLoaded(function(){
    // Initialize Packery after the images are loaded
    $grid.packery({
      itemSelector: '.item', // Portfolio item
    });
  });

  // NOVO: Recalcula o layout do Packery ao redimensionar a janela
  $(window).on('resize', function() {
    // Adicione um pequeno delay para evitar execuções excessivas em redimensionamento contínuo
    clearTimeout($grid.data('packeryResizeTimer'));
    $grid.data('packeryResizeTimer', setTimeout(function(){
      $grid.packery(); // Dispara o layout do Packery
    }, 100)); // Delay de 100ms
  });

  $('.filter-trigger').on('click', function(e){
    e.preventDefault();
    $('body').addClass('filters-active');
    $('html,body').animate({
      scrollTop: $('.grid').offset().top+'px'
    }, 500);

    // NOVO: Força um relayout do Packery após a filtragem
    // Pode ser necessário um pequeno delay para que a visibilidade dos itens se ajuste antes do relayout
    setTimeout(function() {
        $grid.packery();
    }, 600); // Ajuste o tempo para ser um pouco mais que a duração da animação (500ms)
  });


  $('.close-filter').on('click', function(e){
    e.preventDefault();
    $('body').removeClass('filters-active');

    // NOVO: Recalcula o Packery ao fechar o filtro
    setTimeout(function() {
        $grid.packery();
    }, 400); // Um pequeno delay para a transição do filtro
  });

  // Typed functions
  if($('.typed').length){
    $(".typed").typed({
      stringsElement: $('.typed-strings'),
      typeSpeed: 30,
      backDelay: 500,
      loop: true,
      contentType: 'html', // or text
      // defaults to false for infinite loop
      loopCount: false,
      callback: function(){ },
      resetCallback: function() { newTyped(); }
    });
  }

  // Parallax
  $('.parallax').parallax({
    speed : 0.5
  });

  var $animation_elements = $('.item, .fadein'); // The fly-in element, used for elements that fly-in the window after they're visible on screen

  function inView() { // Function when element is in view
    var window_height =   $(window).height();
    var window_top_position =   $(window).scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top-100;
      var element_bottom_position = (element_top_position + element_height);

      //check to see if this current container is within viewport
      if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view');
      } else {
        $element.removeClass('in-view');
      }
    });
  }

  $(window).on('scroll resize', function(){
    window.requestAnimationFrame(inView);
    $('.anchor').each(function(){
      var id = '#'+$('.in-view').attr('id');
      if(id == $(this).attr('href')){
        $('.anchor').removeClass('active');
        $(this).addClass('active');
      }
    });
  });

  $(window).on('load', function(){
    window.requestAnimationFrame(inView);
  });

  $(window).on('pageshow', function(e) {
    if (e.persisted) {
        window.requestAnimationFrame(inView);
    }
  });

  // Contact form
  $('#form').submit(function(e){
    e.preventDefault();
    var $form = $(this);
    var required = $form.find('[required]');
    var serializedData = $form.serialize();
    var url = $('#form').attr('action');
    $form.find('#send, .form-control').prop('disabled', true);
    $.post(url, serializedData, function(response) {
      if(response == 'sent'){
        console.log('Sent');
        $('#send').text('Thank you!');
      } else {
        console.log('Error: Something went wrong!')
      }
    });
  });

  // Search
  $('.search-trigger').on('click', function(e){
    e.preventDefault();
    $('.search').toggleClass('tapped');
    $(this).toggleClass('tapped');
    if($('.search').hasClass('tapped'))
      setTimeout(function(){$('.search .form-control').focus()},300)
  });

  $('.search .close').on('click', function(e){
    e.preventDefault();
    $('.search-trigger, .search').removeClass('tapped');
  });

  // Toggle container
  $('.toggle-container-btn').on('click', function(e){
    e.preventDefault();
    $('.toggleContainer').toggleClass('closed');
  });

})(jQuery); // End of use strict