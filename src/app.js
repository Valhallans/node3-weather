const path = require('path');
const geoCode = require('./utiles/geocode')
const weatherCode = require('./utiles/weathercode')

const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

//Paths
const publicDirPath = path.join(__dirname, '../public')
const views = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')


//handlebars engine
app.set('view engine', 'hbs')
app.set('views', views)
hbs.registerPartials(partials)

//config static folder express
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rinus'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rinus' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'This is a test msg' ,
        title: 'Help',
        name: 'Rinus' 
    })
})

app.get('/weather', (req, res) => {
    debugger
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }
    
    //declare latlonglocal {} default value
    geoCode(req.query.address, (error, {lat, long, location} = {}) => {
        console.log('GeoCode sent back:')
        console.log(error)
        if (error) {
            console.log('GeoCode sent back an error')
            return res.send({
            error
            })
        } else {
            console.log('Getting weather for : ' + location)
            weatherCode(lat, long, (error, data) => {
                if (error) {
                    return res.send({
                        error
                    })
                } else {
                    res.send({
                        summary: data.summary,
                        temperature: data.temperature,
                        precipProbability: data.precipProbability,
                        address: location
                    })
                }
            })
        }
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
        res.render('404', {
        msg: 'Help Article Not Found',
        title: 'Error',
        name: 'Rinus'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        msg: 'Not found',
        title: 'Error',
        name: 'Rinus'
    })
})

app.listen(port, () => {
    console.log('Server has started on port ' + port)
}) 
