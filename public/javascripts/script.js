$(document).ready(function(){
    
    var loadSelectedImage = function(id){    
      var imageURL = 'http://localhost:3000/images/' + id + '.jpg';
        $.get(imageURL, function(data) {
            $('.overlay img').attr("src", imageURL);
            $('.overlay').show();
        });
    };
    
    $('.image-list li a').click(function(){
        loadSelectedImage($(this).attr("id"));
    });
    
    $('.close').click(function(e){
        $('.overlay').hide();  
    });
    
});