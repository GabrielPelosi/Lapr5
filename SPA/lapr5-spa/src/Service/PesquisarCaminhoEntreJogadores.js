import { BASE_URL_ANALISADOR } from '../apis/BaseUrl'
import axios from 'axios'



export const pesquisarCaminhoEntreJogadores = async (setCaminho, origem, destino,url) => {
    await await axios.get(`${BASE_URL_ANALISADOR}/${url}?origem=${origem}&destino=${destino}`)
        .then(response => {
            const caminho = response.data.split(' | ')
            const a = caminho[2].split(' [')
            const j = a[1].split(']')
            const strArr = j[0].split(',')
            setCaminho(strArr)
        }).catch(err => {
            alert("Não existe caminho até esse jogador")
        })

}

export const pesquisarCaminhoEntreJogadoresEstados = async (setCaminho, origem, destino,url,estado,valor) => {
    await await axios.get(`${BASE_URL_ANALISADOR}/${url}?origem=${origem}&destino=${destino}&estado=${estado}&valor=${valor}`)
        .then(response => {
            const caminho = response.data.split(' | ')
            const a = caminho[2].split(' [')
            const j = a[1].split(']')
            const strArr = j[0].split(',')
            setCaminho(strArr)
        }).catch(err => {
            alert("Não existe caminho até esse jogador")
        })

}