import axios from 'axios'
import { BASE_URL_MDRS } from '../apis/BaseUrl'


export default async function getLeaderboardFortaleza(setLeaderboard) {
    await axios.get(`${BASE_URL_MDRS}/api/Jogadores/leader-board/fortaleza/`)
        .then(response => setLeaderboard(response.data))
        .catch(err => alert(err))
}