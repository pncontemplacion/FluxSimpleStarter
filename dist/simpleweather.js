/**
 * Created by Paul on 4/25/2016.
 */
// Docs at http://simpleweatherjs.com

/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
    $('.js-geolocation').show();
} else {
    $('.js-geolocation').hide();
}

/* Where in the world are you? */
$('.js-geolocation').on('click', function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
    });
});

/*
 * Test Locations
 * Tampa,FL
 */
$(document).ready(function() {
    loadWeather('Hays,KS',''); //@params location, woeid
});

function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'f',
        success: function(weather) {
            html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
            html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
            html += '<li class="currently">'+weather.currently+'</li>';
            html += '<li>'+'Low:'+weather.low+'&deg;F'+' High:'+weather.high+'&deg;F</li></ul>';
            html += '<p class="forecast">'+weather.forecast[1].day+':'+'<i class="icon-'+weather.forecast[1].code+'"></i>';
            html += weather.forecast[2].day+':'+'<i class="icon-'+weather.forecast[2].code+'"></i>';
            html += weather.forecast[3].day+':'+'<i class="icon-'+weather.forecast[3].code+'"></i>';
            html += weather.forecast[4].day+':'+'<i class="icon-'+weather.forecast[4].code+'"></i>';
            html += weather.forecast[5].day+':'+'<i class="icon-'+weather.forecast[5].code+'"></i></p>';

            $("#weather").html(html);

        },
        error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
        }
    });
}
