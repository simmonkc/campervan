/* Code to grab custom map for contact section */	
	
	var map;
	var infoWindow;
	var auckland = new google.maps.LatLng(-36.847739,174.764231);
	var mapCenter = new google.maps.LatLng(-39.282443,174.762331);
	

      function initialize() {

        var mapOptions = {
          zoom: 6,
          center: mapCenter,
          maxZoom: 12,
          minZoom: 5,
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP]
          }
        };
               
        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        
        var marker = new google.maps.Marker({
		      position: auckland,
		      map: map,
		      title: "Auckland, New Zealand"		  
		});
		
		
		/*
google.maps.event.addListener(marker,'click', function(){
						
		});
*/
      }