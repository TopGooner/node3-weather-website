const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: "Jamba Juice",
        name: "Gobety Goo"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About Jamba Juice",
        name: "About Gobety Goo"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: "The Artist :P",
        title: "Help Yourself",
        name: "Prince"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "Please provide an address"
        })    
    }
    geocode(req.query.address,(error,{location,latitude,longitude}={})=>{

        if(error){
            return res.send({
                error//"Unabe to connect!"
            })
        } else{
                weather(latitude,longitude,(error,{temperature,feelslike}={})=>{
                    if(error){
                    return res.send({
                        error
                    })
                    } else{
                        return res.send({
                            location: location,
                            temperature: temperature,
                            feelslike: feelslike
                        })
                    }
                })
        }
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error: "Help article not found",
        title: "404",
        name: "RS"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        error:"page not found",
        title: "404",
        name: "RS"
    })
})

app.listen(3000,()=>{
    console.log("server is up!")
})
