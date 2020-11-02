
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

let search = document.getElementById("search").value;


function callApiCCW(){

    $.ajax({ url:cCw, method: "GET"})
    // Log the data in HTML
    .then(function(response) {
      console.log(response);
      if(cCwReturn == undefined){
          cCwReturn = response;
      }
      else{
          console.log("cCw not undefined")
      }

    });
}

function callApiCC5(){

    $.ajax({ url:cC5, method: "GET"})
    // Log the data in HTML
    .then(function(response) {
      console.log(response);
      if(cC5Return == undefined){
          cC5Return = response;
      }
      else{
          console.log("cC5 not undefined")
      }

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

})

function buildCurrCall(){
    cCw = "";
    cCw = apiAddress.concat(apiCallCurrent,search,apikey);
    console.log(cCw);
    console.log(typeof cCw);

}

function buildFutCall(){
    cC5 = "";
    cC5 = apiAddress.concat(apicallForcast5,search,apikey);
    console.log(cC5);
    console.log(typeof cC5);
}