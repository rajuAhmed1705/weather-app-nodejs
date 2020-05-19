const request = require('request');

const geocode = (address, callback) => {

    const url = 'https://api.tomtom.com/search/2/geocode/' + encodeURIComponent(address) + '.JSON?key=PpTV0LTbruwAwQUb5KqtLdAhAXrmGb5x';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to location service', undefined)
        } else if (body.summary.numResults == 0) {
            callback('unable to find the location. please try another address.', undefined)
        } else {
            callback(undefined, {
                latitude: body.results[0].position.lat,
                longitude: body.results[0].position.lon,
                location: body.results[0].address.freeformAddress,
            })
        }
    })
}

module.exports = geocode