const request = require('request')


const geoCode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmFsaGFsbGFuIiwiYSI6ImNrMG96YjIxbzAxdTkzaHFsYm55Mm91N3MifQ.ES6I44gCXjlIQRciGUQPrQ&limit=1'

    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            console.log('Could not connect to to geolocation service')
            return callback('Could not connect to to geolocation service', undefined)
        }
        if (body.message || body.features.length === 0) {
            console.log('Could not find that location')
            return callback('Could not find that location', undefined)
            
        } 
        return callback(undefined, {
            lat: body.features[0].center[1],
            long: body.features[0].center[0],
            location: body.features[0].place_name
        })
    })
}

module.exports = geoCode