$(document).ready(function() {

	// get lattitude and longtitude from IP geolocator
	$.getJSON('http://ip-api.com/json', function(data2) {
		var lat = data2.lat;
		var long = data2.lon;

		// API url with geolocation
		var api = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=d638f9cae2887d5bf1141babe634e6fd';
		$.getJSON(api, function(data) {
			var weatherType = data.weather[0].description;
			var kelvin = data.main.temp;
			var windSpeed = data.wind.speed;
			var city = data.name;

			var fahren = (kelvin*(9/5)-459.67).toFixed(2);
			var celcius = (kelvin-273).toFixed(2);
			windSpeed = (2.237*windSpeed).toFixed(1);
			var tempSwap = true;

			$("#fahren").html(fahren + " &#8457;");
			$("#fahren").click(function() {
				if (tempSwap === true) {
					$("#fahren").html(celcius + " &#8451");
					tempSwap = false;
				} else {
					$("#fahren").html(fahren + " &#8457");
					tempSwap = true;
				}
			});
			$("#city").html(city);
			$("#weatherType").html(weatherType);
			$("#windSpeed").html(windSpeed + " mph");

			// change background according to temperature
			if (fahren > 80) {
				$("body").css('background-image', 'url(https://i.ytimg.com/vi/3EXe5cx5S-0/maxresdefault.jpg)');
			} else if (fahren > 60) {
				$("body").css('background-image', 'url(https://cdn.pixabay.com/photo/2013/11/28/09/57/sky-219769_1280.jpg)');
			} else if (fahren > 40) {
				$("body").css('background-image', 'url(https://ak1.picdn.net/shutterstock/videos/20608981/thumb/1.jpg)');
			} else {
				$("body").css('background-image', 'url(http://cdn.pcwallart.com/images/cold-wallpaper-3.jpg)');
			}
		});
	});	
});