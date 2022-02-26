import axios from 'axios'
import { BASE_URL_MDPC } from '../apis/BaseUrl'
import {toConsultarPostJogadorDto} from '../dto/consultarPostsJogadorDto/consultarPostJogadorDtoFactory'

export default async function consultarPostsJogador(setAllPosts, nome) {
    const consultarPostJogadorDto = toConsultarPostJogadorDto(nome);
    console.log(consultarPostJogadorDto)
    await axios.post(`${BASE_URL_MDPC}/api/posts/userFeed`, {authorName: nome})
        .then((response) => setAllPosts(response.data))
        .catch(err => alert("Usuário não encontrado!"));
}