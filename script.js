
//api call for City[ "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=2c0399c1f79831688f57fb28daf65e33" ];
// api call for 5 day  https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
let cCw ="";
let cC5 ="";
let apiAddress = "https://api.openweathermap.org/data/2.5/";
let apiCallCurrent = "weather?q=";
let apicallForcast5 = "forecast?q=";
let apikey = "&appid=2c0399c1f79831688f57fb28daf65e33";
let cCwReturn = undefined;
let cC5Return = undefined;
let latt;
let long;
let uv;

let search = document.getElementById("search").value;

function uvCall(){
    let uvIndexcall ="https://api.openweathermap.org/data/2.5/uvi?lat="+latt+"&lon="+long+"&appid=2c0399c1f79831688f57fb28daf65e33";
    $.ajax({url:uvIndexcall,method: "GET"})
    .then(function(responce){
        console.log(responce);
        uv = responce;
        document.getElementById("uv").textContent = uv.value;
    });
}


function callApiCCW(){

    $.ajax({ url:cCw, method: "GET"})
    // Log the data in HTML
    .then(function(response) {
      console.log(response);
       cCwReturn = response;
       console.log(typeof cCwReturn);
       // latt=cCwReturn.coord.lat;
       // long=cCwReturn.coord.lon;
       // uvCall();
          displayCurrent();
    

    });
}

function callApiCC5(){

    $.ajax({ url:cC5, method: "GET"})
    // Log the data in HTML
    .then(function(response) {
      console.log(response);
        cC5Return = response;
 
    });
}

$("#searchBtn").on("click",function(){
    search=document.getElementById("search").value;
    console.log("button clicked");
    console.log(search);
    cCwReturn= undefined;
    cC5Return= undefined;

    buildCurrCall();
    console.log("build cur call");
    buildFutCall();
    console.log("bui;d future call");
    callApiCCW();
    console.log("called api for ccw");
    callApiCC5();
    console.log("called api for cc5");
    savedCities();

})

function buildCurrCall(){
    cCw = "";
    cCw = apiAddress.concat(apiCallCurrent,search,apikey);
}

function buildFutCall(){
    cC5 = "";
    cC5 = apiAddress.concat(apicallForcast5,search,apikey);
}

function displayCurrent(){
    document.getElementById("cityname").textContent = cCwReturn.name;
    document.getElementById("temp").textContent = cCwReturn.main.temp +"*F";
    document.getElementById("hum").textContent = cCwReturn.main.humidity +"%";
    document.getElementById("wind").textContent = cCwReturn.wind.speed +" MPH";
    latt = cCwReturn.coord.lat;
    long = cCwReturn.coord.lon;
    uvCall();
    
    

}

function savedCities(){
    let cities = JSON.parse(window.localStorage.getItem("Savedcities")) || [];

      let newCity = {
          name: search,
      };
      cities.push(newCity);
      window.localStorage.setItem("SavedCities",JSON.stringify(cities));
      displayCities();
}
function displayCities (){
    let cities = JSON.parse(window.localStorage.getItem("Savedcities")) || [];

    for(i=0;i<=cities.length;i++){
        let butt = document.createElement("button");
        //butt.textContent = cities[i][name];
        butt.setAttribute("class","btn");
        butt.className +=(" btn-secondary");
        butt.className +=(" btn-lg");
        document.getElementById("cityButtons").appendChild(butt);
        let brek = document.createElement("br");
        document.getElementById("cityButtons").appendChild(brek);
        
    }

}
function clearCities(){
    window.localStorage.removeItem("cities");
    window.location.reload();
}