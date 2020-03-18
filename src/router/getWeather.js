const express = require('express')
const router = new express.Router()
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

router.get('/api', (req, ret) => {
    return ret.send({
        error: 'Endereço incorreto!',
        solucao: 'URL deve ser algo como url/api/ENDERECO'       
    })
})

router.get('/api/*', (req,ret) => {
    const urlSegment = req.url
    const endereco = urlSegment.substring(urlSegment.lastIndexOf('/') + 1)
    
    geocode.getGeocode(endereco, (err, res) => {
        if (!res)
            return ret.send({error:err, errorID: 2})
            
        const { longitude, latitude, local, geoLocal } = res

        forecast.getPrevisao(geoLocal, (err, res) => {
            if (!res)
                return ret.send({error:err, geoLocal, errorID: 3})    
        
        
            ret.send({
                endereco,
                local,
                geoLocation: {
                    longitude,
                    latitude,
                },
                clima: {
                    celsius: res.celsius,
                    probchuva: res.probChuva,
                    resumo: res.resumo,
                    tempMax: res.tempMax,
                    tempMin: res.tempMin,
                    infoResumo: res.infoResumo,
                    infoChuva: res.infoChuva,
                    infoTemp: res.infoTemp
                }
            })
    
        })
    })
})

    
module.exports = router