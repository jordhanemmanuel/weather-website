const request = require('request')

const tokenMapBox = 'pk.eyJ1IjoiYmF6b21nYSIsImEiOiJjazdhajVyMXgxNGhqM2ZxazJtYTJiMHRhIn0.OXRg2QNHwbJORo5xWLZMUg'

//const localMapBox = 'Umuarama%20Parana%20Br'
//pode-se usar também a função encodeURIComponent(address), que retorna uma string para URL ^

//const urlDarkSky = `https://api.darksky.net/forecast/${tokenDarkSky}/-23.7712,-53.2994?lang=pt&units=si` //latitude,longitude

const getGeocode = (address, callback) => {
    const localMapBox = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${localMapBox}.json?access_token=${tokenMapBox}&limit=1`
    request ({url : url, json: true}, (err, {body}) => {
        if (err){
            callback('Não foi possível conectar com MapBox!', undefined)
        } else if (body.message){
            callback(res.body.message, undefined)
        } else if (body.features.length === 0){
            callback('Não foi encontrado nenhuma localidade.', undefined)
        } else {
            //const { center[0]:longitude, center[1]:latitude, local:place_name } = res.body.features[0]
            //const { center:geoArray, place_name:local } = res.body.features[0]
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            const geoLocal = latitude + "," + longitude
            const local = body.features[0].place_name
            callback(undefined, {
                longitude,
                latitude,
                geoLocal,
                local
            })
        }
    }) 
}



module.exports = {getGeocode}