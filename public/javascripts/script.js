$(document).ready(function(){
    

    
    var loadSelectedImage = function(href){    
      $('.overlay').show();
      $('.selected-image img').attr("src", href);
      $('body').css("overflow-y","hidden");
        
    };
    
    $('.image-list li a').click(function(e){
        loadSelectedImage($(this).attr("href"));
        e.preventDefault();        
    });
    
    $('.close').click(function(e){
        $('.overlay').hide();  
    });
    
});