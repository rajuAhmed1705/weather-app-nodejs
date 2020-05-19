const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')
const app = express()

const port = process.env.PORT || 3000
// console.log(__dirname);
// console.log(__filename);
const publicDirectoryPath = path.join(__dirname,'../public')
const viewDirectoryPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//hbs engine
app.set('view engine','hbs')
app.set('views',viewDirectoryPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',{
        title: 'weather',
        name: 'raju ahmed'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'about',
        name: 'raju ahmed'
    })
})
app.get('/about', (req, res) => {
    res.render('about',{
        title: 'about',
        name: 'raju ahmed'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'help',
        name: 'raju ahmed'
    })
})

app.get('/weather',(req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude,location} = {})=> {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, { weather, temp, feels_like }) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: `Current waether is ${weather}. Temparature ${temp} degrees, feels like ${feels_like} degrees celcius.`,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'it is raining'
    // })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: 'not found',
        name: 'raju ahmed',
        text: '404|not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port: '+port);
    
})