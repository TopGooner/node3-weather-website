const request = require('request')
const weather = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=12c4e4985a37be3d56b68bc53c2d81be&query='
    +encodeURIComponent(latitude)+","+encodeURIComponent(longitude)
    request({url, json: true},(error,{body}={})=>{
        if(error){
            callback("Unable to connect to location services!",undefined)
        }else if(body.error){
            callback("Unable to find the location! Please try another location",undefined)
        }else{
            callback(undefined,{
                location: body.location.name,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = weather