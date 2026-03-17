let weatherData = {}
let cnnResult = {}

function scrollTelemetry(){
document.getElementById("telemetry").scrollIntoView({behavior:"smooth"})
}

function scrollArchitecture(){
document.getElementById("features").scrollIntoView({behavior:"smooth"})
}



async function analyzeWeather(){

const lat = document.getElementById("lat").value
const lon = document.getElementById("lon").value

if(!lat || !lon){
alert("Enter latitude and longitude")
return
}

try{

const res = await fetch("/analyze",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({lat,lon})
})

const data = await res.json()

weatherData = data.weather
cnnResult = data


/* WEATHER UI */

document.getElementById("temp").innerText =
weatherData.temperature_2m + " °C"

document.getElementById("wind").innerText =
weatherData.wind_speed_10m + " km/h"

document.getElementById("humidity").innerText =
weatherData.relative_humidity_2m + " %"

document.getElementById("pressure").innerText =
weatherData.pressure_msl + " hPa"

document.getElementById("riskLevel").innerText =
data.risk

document.getElementById("resultCard").style.display="block"

}
catch(err){

console.log(err)
alert("Server error")

}

}

function runCNN(){

if(!cnnResult.risk){
alert("Run Analyze first")
return
}

document.getElementById("cnnRiskLevel").innerText =
cnnResult.risk

document.getElementById("confidence").innerText =
(cnnResult.confidence * 100).toFixed(1) + "%"

document.getElementById("accuracy").innerText = "87.4%"


/* BARS */

const wind = weatherData.wind_speed_10m
const humidity = weatherData.relative_humidity_2m
const cloud = weatherData.cloud_cover
const rain = weatherData.precipitation
const temp = weatherData.temperature_2m


document.getElementById("barWind").style.width = wind + "%"

document.getElementById("barVis").style.width =
(100 - cloud) + "%"

document.getElementById("barTurb").style.width =
(wind * 2) + "%"

document.getElementById("barRain").style.width =
(rain * 20) + "%"

document.getElementById("barTemp").style.width =
temp + "%"

document.getElementById("barCloud").style.width =
cloud + "%"

}
function autoLocation(){

if(!navigator.geolocation){

alert("Geolocation not supported")
return

}

navigator.geolocation.getCurrentPosition(

function(position){

document.getElementById("lat").value = position.coords.latitude
document.getElementById("lon").value = position.coords.longitude

},

function(error){

alert("Location permission denied")

}

)

}