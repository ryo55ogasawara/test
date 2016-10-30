var sys = require('sys')
var exec = require('child_process').exec;


var APPLICATIONKEY = "934fe58a111a44624f2ebd6ff5371a042fe26021992a68f83bcd193756502bbe"
var CLIENTKEY = "beb657fa101077abcb7934f3e7e39e071f5ae92788a400d52a17b1601b775a83"


//1. mobile backendのSDKの読み込み
var NCMB = require("/home/pi/node_modules/ncmb/lib/ncmb");
 
// 2. mobile backendアプリとの連携
var ncmb = new NCMB(APPLICATIONKEY,CLIENTKEY);

 
//setInterval(function() {
  exec("python /home/pi/161029sensar/light.py", function (error, stdout, stderr) {
    if (error !== null) {
       console.log('exec error: ' + error);
       return
    }

    date  = new Date();
    year  = date.getFullYear();
    month = date.getMonth()+1;
    day   = date.getDate();
    hour  = date.getHours();
    min   = date.getMinutes();
    sec   = date.getSeconds();

    datas = stdout.split(",")
    // Compose records
    var record = {
       "deviceid": "pi_01",
       "timestamp": year + "/"+ month + "/" + day + " " + hour + ":" + min + ":" + sec,
       "lux": datas[0],
    };

    console.log("deviceid:" +record.deviceid);
    console.log("timestamp:" +record.timestamp);
    console.log("lux:" +record.lux);
 
    var TemperatureClass = ncmb.DataStore("Illuminance");
    var temperatureClass = new TemperatureClass();
 
    temperatureClass.set("illuminance",record.lux);
    temperatureClass.set("date",date);
    temperatureClass.save()
    　　　　　　　　   .then(function(){
                      console.log("message is saved.");
                     })
                    .catch(function(err){
                      console.log(err.text);
                    });
  });
//},60000);

