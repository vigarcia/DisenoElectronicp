let map;
function initMap(){
	coord = {lat: 11.003702 , lng: -74.8222894 };
	map = new google.maps.Map(document.getElementById('map'),{
	zoom: 10,
	center: coord
	});
	marcador = new google.maps.Marker({
		position: coord ,
		map: map
	}
	);
	
}
