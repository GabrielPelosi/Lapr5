import {toTamanhoRedeTotalDto} from '../dto/TamanhoRedeTotalDto/TamanhoRedeTotalDtoFactory'
import axios from 'axios'
import { BASE_URL_MDRS } from '../apis/BaseUrl'

export const getTamanhoRedeTotal = async (setTamanhoRedeTotal) => {
    await axios.get(`${BASE_URL_MDRS}/api/Jogadores/tamanho-rede-geral`)
        .then(response => setTamanhoRedeTotal(toTamanhoRedeTotalDto(response.data)))
        .catch(err => alert(err))
}