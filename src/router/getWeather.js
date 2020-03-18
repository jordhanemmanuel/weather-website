const express = require('express')
const router = new express.Router()
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

router.get('/api/get', (req,ret) => {

    if (!req.body.endereco){
        return ret.send({
            error: 'Erro: Não foi informado nenhum endereço.',
            errorID: 1
        })
    }
    
    geocode.getGeocode(req.body.endereco, (err, res) => {
        if (!res)
            return ret.send({error:err, errorID: 2})
            
        const { longitude, latitude, local, geoLocal } = res

        forecast.getPrevisao(geoLocal, (err, res) => {
            if (!res)
                return ret.send({error:err, geoLocal, errorID: 3})    
        })
        
        ret.send({
            address: req.body.endereco,
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
    
module.exports = router

