const express = require('express')
const router = new express.Router()
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

router.get('/api/get', (req,ret) => {
    if (!req.query.address){
        return ret.send({
            error: 'Erro: Não foi informado nenhum endereço.'
        })
    }
    
    geocode.getGeocode(req.query.address, (err, res) => {
        if (!res)
            return ret.send({error:err, log: 'Linha 57'})
            
        const { longitude, latitude, local, geoLocal } = res

        forecast.getPrevisao(geoLocal, (err, res) => {
            if (!res)
                return ret.send({error:err, log: 'Linha 62', geoLocal})

            ret.send({
                address: req.query.adress,
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