console.log('Client side javascript file is loaded!')

const weatherForm   = document.querySelector('form')
const search        = document.querySelector('input')
const messageLoad   = document.querySelector('#message-load')
const msgLocal      = document.querySelector('#msg-local')
const msgResumo     = document.querySelector('#msg-resumo')
const msgInfoChuva  = document.querySelector('#msg-infoChuva')
const msgTempMin    = document.querySelector('#msg-tempMin')
const msgTempMax    = document.querySelector('#msg-tempMax')
const urlInit       = "http://localhost:3000"
const auxResumo     = msgResumo.textContent
const auxTempMin    = msgTempMin.textContent
const auxTempMax    = msgTempMax.textContent

cleanFields()

weatherForm.addEventListener('submit', (e) => { //e é abraviação para event
    e.preventDefault() //se nao botar esse código, a pagina da reload no submit
    cleanFields()
    messageLoad.textContent += 'Procurando...   '
    fetch("/previsao?address="+encodeURIComponent(search.value)).then((response) => {
        response.json().then((data) => {
                messageLoad.textContent = ''
            if (data.error){
                msgLocal.textContent = data.error
            } else {
                msgLocal.textContent        = data.local
                msgResumo.textContent       = auxResumo + data.clima.infoResumo
                msgInfoChuva.textContent    = data.clima.infoChuva
                msgTempMax.textContent      = auxTempMax + data.clima.tempMax + '°C'
                msgTempMin.textContent      = auxTempMin + data.clima.tempMin + '°C'
            }
        })
    })
})

function cleanFields() {
    messageLoad.textContent     = ''
    msgLocal.textContent        = ''
    msgResumo.textContent       = ''
    msgInfoChuva.textContent    = ''
    msgTempMin.textContent      = ''
    msgTempMax.textContent      = ''
}