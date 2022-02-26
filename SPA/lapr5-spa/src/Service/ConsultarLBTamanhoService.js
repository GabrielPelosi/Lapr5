import axios from 'axios'
import { BASE_URL_MDRS } from '../apis/BaseUrl'
import {toLeaderBoardFortalezaDto} from '../dto/LeaderboardTamanhoDto/LBTamanhoDtoFactory'

export default async function getLeaderboardTamanho(setLeaderboard) {
    await axios.get(`${BASE_URL_MDRS}/api/Jogadores/leader-board/tamanho/`)
        .then(response => setLeaderboard(toLeaderBoardFortalezaDto(response.data)))
        .catch(err => alert(err))
}