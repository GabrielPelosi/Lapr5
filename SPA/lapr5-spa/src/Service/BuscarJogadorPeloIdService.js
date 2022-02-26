import {BASE_URL_MDRS} from '../apis/BaseUrl'
import {getIdJogadorAutenticado} from '../utils/JogadorIDLocalStorage'
import axios from 'axios'



export const buscarJogadorPeloId = async (setCurrentUser) => {
    const USER_ID = getIdJogadorAutenticado();
    await axios.get(`${BASE_URL_MDRS}/api/Jogadores/${USER_ID}`)
        .then((response) => {
            setCurrentUser(response.data);
        }).catch((err) => alert(err));

}