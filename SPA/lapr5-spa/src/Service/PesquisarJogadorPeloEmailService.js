import {BASE_URL_MDRS} from '../apis/BaseUrl'
import {setIdJogadorAuthenticado} from '../utils/JogadorIDLocalStorage'
import axios from 'axios'



export const pesquisarPeloEmail = async (setCurrentUser, email) => {
    await axios.get(`${BASE_URL_MDRS}/api/Jogadores/pesquisar/email/${email}`)
        .then((response) => {
            setCurrentUser(response.data);
            setIdJogadorAuthenticado(response.data.id);
        }).catch((err) => alert("Jogador não encontrado"));

}