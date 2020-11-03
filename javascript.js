var apiKey = '6e30fd10bfcb2aaa6c45d775afee83e7'
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth()+1;
var currentDate = date.getDate();
var forecastDate = []
var forecastIcon = []
var forecastTemp = []
var forecastHumidity = []

if (currentDate < 10) {
  currentDate = '0' + currentDate;
}
if (month < 10) {
  month = '0' + month;
}


//Search button click event...
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

    // to get UV Index...
    var uvUrl = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey

    $.ajax({
        url: uvUrl,
        method: "GET"
    }).then(function(uv){
        console.log(uv)
        var uvIndex = uv.value
        $("#currentUV").text("UV Index: " + uvIndex)
    })

    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=' + apiKey

    $.ajax({
        url: forecastUrl,
        method: "GET"
    }).then(function(cast){
        console.log(cast.list)
            for(i = 1; i< cast.list.length; i ++){

            if((i % 8) == 0){
                console.log(i)
            var castDate = cast.list[i].dt_txt
            var futureDate = castDate.split(" ")[0]
            var splitDate = futureDate.split('-')
            var castYear = splitDate[0]
            var castMonth = splitDate[1]
            var castDay = splitDate[2]
            var concatDate = castMonth + '/' + castDay + '/' + castYear
            var castIconId = cast.list[i].weather[0].icon
            var castTemp = cast.list[i].main.temp
            var castHumidity = cast.list[i].main.humidity
            
            forecastDate.push(concatDate)
            forecastIcon.push(castIconId) 
            forecastTemp.push(castTemp)
            forecastHumidity.push(castHumidity)
            
            } else if(i == 39) {
                
            
            var castDate = cast.list[i].dt_txt
            var futureDate = castDate.split(" ")[0]
            var splitDate = futureDate.split('-')
            var castYear = splitDate[0]
            var castMonth = splitDate[1]
            var castDay = splitDate[2]
            var concatDate = castMonth + '/' + castDay + '/' + castYear
            var castIconId = cast.list[i].weather[0].icon
            var castTemp = cast.list[i].main.temp
            var castHumidity = cast.list[i].main.humidity
            
            forecastDate.push(concatDate)
            forecastIcon.push(castIconId) 
            forecastTemp.push(castTemp)
            forecastHumidity.push(castHumidity)
    }
    }
    var dateElement = document.getElementsByClassName('date')
    var iconElement = document.getElementsByClassName('icon')
    var tempElement = document.getElementsByClassName('temperature')
    var humElement = document.getElementsByClassName('humidity')
    for(var x = 0; x < dateElement.length; x++){
        console.log(x)
    var forecastIUrl = "http://openweathermap.org/img/w/" + forecastIcon[x] + ".png"

    dateElement[x].innerHTML = forecastDate[x]
    iconElement[x].setAttribute('src', forecastIUrl)
    tempElement[x].innerHTML = "Temp: " + forecastTemp[x]
    humElement[x].innerHTML = "Humidity: " + forecastHumidity[x] + '%'


     } 
    })



})
})

$('#currentBtn').on('click', function(){
      
    $('#current').attr('style', 'display: block')
    $('#current').attr('class', 'nav-link active')
    $('#forecast').attr('style', 'display: none')
    $('#forecast').attr('class', 'nav-link')   
    
})

$('#forecastBtn').on('click', function(){

    $('#current').attr('style', 'display: none')
    $('#current').attr('class', 'nav-link')
    $('#forecast').attr('style', 'display: block')
    $('#forecast').attr('class', 'nav-link active')

})
