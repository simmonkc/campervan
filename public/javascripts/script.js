$(document).ready(function(){
    
    $('body').on('loadSelectedImage', function(event, href){
      $('.overlay').show();
      $('.selected-image img').attr("src", href);
      $('body').css("overflow-y","hidden");
    });

    var loadSelectedImage = function(href){    
      $('.overlay').show();
      $('.selected-image img').attr("src", href);
      $('body').css("overflow-y","hidden");
    };
    
    $('.image-list li a').click(function(e){
        e.preventDefault();        
        $('body').trigger('loadSelectedImage', $(this).attr('href'));
    });
    
    $('.close').click(function(e){
        $('.overlay').hide();  
    });
    
});