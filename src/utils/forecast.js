const request = require('request')

const tokenDarkSky = '8e34908ceb0cc63989aefd2313c3ce52'

const getPrevisao = (geoLocal, callback) => {
//console.log(urlDarkSky)
    const url = `https://api.darksky.net/forecast/${tokenDarkSky}/${geoLocal}?lang=pt&units=si`
    request ({url, json: true}, (err, {body}) => { //err = erro, res = resposta
        //const celsius = Celsius(res.body.currently.temperature)
        if (err) {   
            callback('Não foi possível conectar com DarkSky!', undefined) 
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            const { temperature:celsius, precipProbability:precipChuva } = body.currently
            const { temperatureHigh:tempMax, temperatureLow:tempMin, summary:resumo } = body.daily.data[0]
            const probChuva = precipChuva * 100
            const infoResumo = 'Previsao para hoje: ' + resumo
            const infoChuva = `Temperatura atual está em ${celsius}°C, com ${probChuva}% probabilidade de chuva.`
            const infoTemp = `Temperatura Máxima: ${tempMax}°C | Temperatura Mínima: ${tempMin}°C.`
            callback(undefined, {
                celsius,
                probChuva,
                resumo,
                tempMax,
                tempMin,
                infoResumo,
                infoChuva,
                infoTemp
            })
            //console.log(chalk.redBright(urlDarkSky))
        }
    })
}

module.exports = {getPrevisao}