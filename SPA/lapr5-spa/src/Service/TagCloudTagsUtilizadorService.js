import axios from 'axios'
import { BASE_URL_MDRS } from '../apis/BaseUrl'
import { getIdJogadorAutenticado } from '../utils/JogadorIDLocalStorage'
import { toTagCloudDto } from '../dto/TagCloudTagsUtilizadorDto/TagCloudUtilizadorDtoFactory'

const USER_ID = getIdJogadorAutenticado();

export default async function getUserTagCloud(setTagCloud) {
    await axios.get(`${BASE_URL_MDRS}/api/Jogadores/my-tags-tagcloud/${USER_ID}`)
        .then(response => setTagCloud(toTagCloudDto(response.data)))
        .catch(err => alert(err))
}