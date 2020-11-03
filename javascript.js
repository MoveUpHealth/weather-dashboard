var apiKey = '6e30fd10bfcb2aaa6c45d775afee83e7'
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth()+1;
var currentDate = date.getDate();

if (currentDate < 10) {
  currentDate = '0' + currentDate;
}
if (month < 10) {
  month = '0' + month;
}

console.log(month+'/' + currentDate + '/'+ year);

$(".btn-search").on("click", function(e) {
    e.preventDefault()
    $('.form-control').empty()
    var cityName = $('.form-control').val().trim()
    var queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey

$.ajax({
    url: queryUrl,
    method: "GET"
})
.then(function(response){
    console.log(response)
    var iconId = response.weather[0].icon
    console.log(iconId)
    var iconSrc = "http://openweathermap.org/img/w/" + iconId + ".png"
    var city = response.name
    var temp = response.main.temp
    var humidity = response.main.humidity
    var speed = response.wind.speed
    var longitude = response.coord.lon
    var latitude = response.coord.lat
    $(".city").text(city)
    $("#currentDate").text(month+'/' + currentDate + '/'+ year)
    $("#currentIcon").attr('src', iconSrc)
    $("#currentTemp").text("Temperature: " + temp)
    $("#currentHumidity").text("Humidity: " + humidity + "%")
    $("currentWind").text("Wind Speed: " + speed)

    var uvUrl = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey

    $.ajax({
        url: uvUrl,
        method: "GET"
    }).then(function(uv){
        console.log(uv)
        var uvIndex = uv.value
        $("#currentUV").text("UV Index: " + uvIndex)
    })



})
})