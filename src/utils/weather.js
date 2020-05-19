const request = require('request')


const weather = (lat,lon,callback) =>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon +'&units=metric&appid=af06a1edcde951fcd55051fce6bd9a21'
    // console.log(lat);
    // console.log(lon);
    
    request({url, json:true},(error,{body}) => {
        if (error) {
            callback('unable to connect to the server',undefined)
        }else{
            callback(undefined,{
                temp: body.main.temp,
                feels_like: body.main.feels_like,
                humidity: body.main.humidity,
                weather: body.weather[0].description,
            })
        }
    })

}

module.exports = weather