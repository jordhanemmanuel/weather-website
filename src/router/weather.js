const express = require('express')
const router = new express.Router()
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

//req no callback é os parametros que ele vai pegar, enquanto res a resposta que ele envia
router.get('', (req, res) => { //get serve para declarar o que ele vai fazer quando chegar uma requisição
    //res.send('<h1>Hello express!</h1>') //o primeiro parametro '' é o endereço, vazio significa a home
    res.render('index', {
        title: 'Home',
        name: 'Jordhan',
        info: 'Digite o nome de uma cidade, opcionalmente pode ser especificado o estado ou país:'
    })
})

router.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'Não tem nada aqui, somente um Ovo de Páscoa.'
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        text: 'App criado para o curso de NodeJS.'
    })
})

router.get('/previsao', (req,ret) => {
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

router.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error:'No search term detected.'
        })    
    }
            
    console.log(req.query)
    res.send({
        products: req.query.search
    })


})

module.exports = router