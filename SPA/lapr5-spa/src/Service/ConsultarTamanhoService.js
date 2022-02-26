import axios from 'axios'
import { BASE_URL_MDRS } from '../apis/BaseUrl'
import { getIdJogadorAutenticado } from '../utils/JogadorIDLocalStorage'
import { toTamanhoDto } from '../dto/TamanhoDto/TamanhoDtoFactory'

const USER_ID = getIdJogadorAutenticado();

export default async function getTamanhoRede(setTamanho) {
    await axios.get(`${BASE_URL_MDRS}/api/Jogadores/tamanho/${USER_ID}`)
        .then(response => setTamanho(toTamanhoDto(response.data)))
        .catch(err => alert(err))
}