const request = require('request')
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoicm9oaXQtc2hhcm1hIiwiYSI6ImNraTdidnFndzEybGwzMW1od3czenhmeTkifQ.FTM1uR6Owo5oAO7gBfNSjA'
    request({url, json: true},(error,{body}={})=>{
        if(error){
            callback("Unable to connect to location services!",undefined)
        }else if(body.features.length===0){
            callback("Unable to find the location! Please try another location",undefined)
        }else{
            callback(undefined,{
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode