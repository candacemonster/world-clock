function updateTime() {
//Las Vegas 
let lasVegasElement = document.querySelector("#las-vegas");
let lasVegasDateElement = lasVegasElement.querySelector(".date");
let lasVegasTimeElement = lasVegasElement.querySelector(".time");
let lasVegasTime = moment().tz("America/Los_Angeles");


lasVegasDateElement.innerHTML = lasVegasTime.format("dddd, MMMM Do YYYY	");
lasVegasTimeElement.innerHTML = lasVegasTime.format("h:mm:ss [<small>]A[</small>]"
);

//Zulu
let zuluElement = document.querySelector("#zulu");
let zuluDateElement = zuluElement.querySelector(".date");
let zuluTimeElement = zuluElement.querySelector(".time");
let zuluTime = moment().tz("Zulu");


zuluDateElement.innerHTML = zuluTime.format("dddd, MMMM Do YYYY	");
zuluTimeElement.innerHTML = zuluTime.format("h:mm:ss [<small>]A[</small>]"
);
}

updateTime();
setInterval(updateTime, 1);