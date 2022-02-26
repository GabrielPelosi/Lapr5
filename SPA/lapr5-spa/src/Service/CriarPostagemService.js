import axios from 'axios'
import { BASE_URL_MDPC } from '../apis/BaseUrl'

export default async function criarPostagem(postRequestDto) {
    await axios.post(`${BASE_URL_MDPC}/api/posts/`,postRequestDto)
        .then(() =>{
             alert('Postagem criada com sucesso')
             window.location.href = "/"
            })
        .catch(err => alert(err))
}