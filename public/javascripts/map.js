/* Code to grab custom map for contact section */	
	
	var map;
	var infoWindow;
	var auckland = new google.maps.LatLng(-36.847739,174.764231);
	var mapCenter = new google.maps.LatLng(-39.282443,174.762331);
	

      var MY_MAPTYPE_ID = 'kyle_simmons';

      function initialize() {

        var styles = [
		  {
		    "featureType": "water",
		    "stylers": [
		      { "color": "#191919" }
		    ]
		  },{
		    "featureType": "poi",
		    "stylers": [
		      { "visibility": "off" }
		    ]
		  },{
		    "featureType": "administrative.locality",
		    "stylers": [
		      { "visibility": "off" }
		    ]
		  },{
		    "featureType": "administrative.province",
		    "stylers": [
		      { "visibility": "off" }
		    ]
		  },{
		    "featureType": "administrative.neighborhood",
		    "stylers": [
		      { "visibility": "off" }
		    ]
		  },{
		    "featureType": "road",
		    "stylers": [
		      { "color": "#000000" }
		    ]
		  },{
		    "featureType": "poi",
		    "stylers": [
		      { "visibility": "off" }
		    ]
		  },{
		    "featureType": "landscape",
		    "stylers": [
		      { "color": "#ffffff" }
		    ]
		  },{
		  },{
		  }
		];
		var image = 'img/penguin-2.png';

        var mapOptions = {
          zoom: 6,
          center: mapCenter,
          disableDefaultUI: true,
          maxZoom: 12,
          minZoom: 5,
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
          },
          mapTypeId: MY_MAPTYPE_ID
        };

        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        
        var marker = new google.maps.Marker({
		      position: auckland,
		      map: map,
		      icon: image,
		      title: "Auckland, New Zealand"		  
		});
		
		infowindow = new google.maps.InfoWindow(); 
		
		google.maps.event.addListener(marker,'click', function(){
			
			infowindow.setContent('<b>Current Whereabouts:</b><br/> Auckland, New Zealand');
			infowindow.open(map, marker);
			
		});
        
       
		
        var styledMapOptions = {
          name: 'Kyle Simmons'
        };

        var kyleSimmonsMapType = new google.maps.StyledMapType(styles, styledMapOptions);

        map.mapTypes.set(MY_MAPTYPE_ID, kyleSimmonsMapType);
      }