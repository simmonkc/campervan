/* Code to grab custom map for contact section */	
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(-39.282443,174.762331),
          zoom: 5,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
        var marker = new google.maps.Marker({
		      position: new google.maps.LatLng(-36.847739,174.764231),
		      map: map,
		      title: "Auckland, New Zealand"		  
		      });
		    google.maps.event.addListener(marker,'click', function(){
				
				  console.log("Lorem Ipsum");
						
		    });
      }
      


      /*
function initialize() {

        var mapOptions = {
          zoom: 3,
          center: ,
          maxZoom: 12,
          minZoom: 3,
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.SATELLITE]
          }
        };
               
        var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        
*/
       /*
 var marker = new google.maps.Marker({
		      position: new google.maps.LatLng(-36.847739,174.764231),
		      map: map,
		      title: "Auckland, New Zealand"		  
		});
*/
		
				/*


		
      };*/ 