
//api call for City[ "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=2c0399c1f79831688f57fb28daf65e33" ];
// api call for 5 day  https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
//api.openweathermap.org/data/2.5/find?q=London&units=imperial

let cCw ="";
let cC5 ="";
let apiAddress = "https://api.openweathermap.org/data/2.5/";
let apiCallCurrent = "weather?q=";
let apicallForcast5 = "forecast/daily?q=";
let apicall5cnt = "&cnt=5"
let apikey = "&units=imperial&appid=2c0399c1f79831688f57fb28daf65e33";
let cCwReturn = undefined;
let cC5Return = undefined;
let latt;
let long;
let uv;
let search;
now = moment().format('LLLL');
            

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
        latt=cCwReturn.coord.lat;
        long=cCwReturn.coord.lon;
         uvCall();
         callApiCC5();
          displayCurrent();
    

    });
}

function callApiCC5(){
    let call5 ="https://api.openweathermap.org/data/2.5/onecall?lat="+latt+"&lon="+long+"&units=imperial&appid=2c0399c1f79831688f57fb28daf65e33";
    $.ajax({ url:call5, method: "GET"})
    // Log the data in HTML
    .then(function(response) {
      console.log(response);
        cC5Return = response;
        displayFive();
 
    });
}

$("#searchBtn").on("click",function(){
    search=document.getElementById("search").value;
    if (search ==""){
        alert("search cannot be blank");
    }
    else{
    console.log("button clicked");
    console.log(search);
    cCwReturn= undefined;
    cC5Return= undefined;

    buildCurrCall();
    console.log("build cur call");
    callApiCCW();
    console.log("called api for ccw");
    savedCities();
    }
})

function buildCurrCall(){
    cCw = "";
    cCw = apiAddress.concat(apiCallCurrent,search,apikey);
}


function displayCurrent(){
    document.getElementById("cityname").textContent = cCwReturn.name;
    document.getElementById("weatherPNG").setAttribute("src","http://openweathermap.org/img/wn/"+cCwReturn.weather[0].icon+"@2x.png");
    now = moment().format('LLLL');
    document.getElementById("timeDate").textContent = now;
    document.getElementById("temp").textContent = cCwReturn.main.temp ;
    document.getElementById("hum").textContent = cCwReturn.main.humidity +"%";
    document.getElementById("wind").textContent = cCwReturn.wind.speed +" MPH";
    latt = cCwReturn.coord.lat;
    console.log(latt);
    long = cCwReturn.coord.lon;
    console.log(long);
    
    
    

}

function savedCities(){
    let cities = JSON.parse(window.localStorage.getItem("SavedCities")) || [];
    let sf = document.getElementById("search").value;
    console.log(sf)
    let newCity = search.toString();
    newCity2 = newCity.toLowerCase();
    console.log(newCity2)
    if(cities.length>0)
        {
            let a = cities.indexOf(newCity2);
             
            console.log(a);
                if(a == -1){
                    
                    cities.push(newCity2);
                }
                else{
                    ;
                }
    }
    else{
            cities.push(newCity2);
        }
    window.localStorage.setItem("SavedCities",JSON.stringify(cities));
     
    displayCities();
}
function displayCities (){
    let cities = JSON.parse(window.localStorage.getItem("SavedCities")) || [];
    console.log(cities);

    for(i=0;i<cities.length;i++){
        if(document.getElementById(cities[i]) == null){
        let butt = document.createElement("button");
        butt.textContent = cities[i];
        butt.setAttribute("class","btn");
        butt.className +=(" btn-secondary");
        butt.className +=(" btn-lg");
        butt.setAttribute("id",cities[i]);
        document.getElementById("cityButtons").appendChild(butt);
        let brek = document.createElement("br");
        document.getElementById("cityButtons").appendChild(brek);
        document.getElementById(cities[i]).addEventListener("click",function(){
            search = $(this)[0].textContent;
            buildCurrCall();
            callApiCCW();
        })
        

        }
    }
}

function displayFive(){

for(i=1;i<=5;i++)
    {
    let day = i;
    let daytxt = "day"+(day.toString());
    console.log(daytxt);
    let list = document.createElement("ul");
    let q = document.createElement("li");
    let t = moment().add(1,'d');
    s = t.format('L');
    q.textContent = s;
    list.appendChild(q);
    let l1 =document .createElement("li");
    l1.textContent = "Temp: "+cC5Return.daily[i+1].temp.day+" F";
    list.appendChild(l1);
    let l2 = document.createElement("li");
    l2.textContent = "Hum: "+cC5Return.daily[i+1].humidity+" %";
    list.appendChild(l2);
    let img = document.createElement("img");
    img.setAttribute("src","http://openweathermap.org/img/wn/"+cC5Return.daily[i+1].weather[0].icon+"@2x.png");
    list.appendChild(img);
    document.getElementById(daytxt).appendChild(list);
    }
    




}

function clearCities(){
    window.localStorage.removeItem("cities");
    window.location.reload();
}
displayCities();