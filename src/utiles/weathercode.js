const request = require('request')


const weatherCode = (lat, long, callback) => {

    const url = 'https://api.darksky.net/forecast/ae5c5ff7aed36593c6ee7dba754e5b9c/' + lat +','+ long+ '?units=si'
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Could not connect to weather service', undefined)
        } else {
            if (body.error) {
                callback('Error : ' + body.error, undefined)
            } else {
                callback(undefined, {
                    summary: body.daily.data[0].summary,
                    temperature: body.currently.temperature,
                    precipProbability: body.currently.precipProbability
                })
            }
        }
    })
}

module.exports = weatherCode