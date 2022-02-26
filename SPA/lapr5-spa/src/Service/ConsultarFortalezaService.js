import axios from 'axios'
import {BASE_URL_MDRS} from '../apis/BaseUrl'
import {getIdJogadorAutenticado} from '../utils/JogadorIDLocalStorage'
import {toFortalezaDto} from '../dto/fortalezaDto/FortalezaDtoFactory'

const USER_ID = getIdJogadorAutenticado();

export default async function  getFortalezaPorJogador(setFortaleza){
    await axios.get(`${BASE_URL_MDRS}/api/Jogadores/fortaleza/${USER_ID}`)
    .then(response => setFortaleza(toFortalezaDto(response.data)))
    .catch(err => alert(err))
}   