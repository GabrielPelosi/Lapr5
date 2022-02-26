import { BASE_URL_MDPC } from '../apis/BaseUrl'
import axios from 'axios'

export const commentPost = async (commentDto) => { //put correct parameters
    await axios.post(`${BASE_URL_MDPC}/api/comments`, commentDto) //change path
        .then(res => {
            alert('Cometário feito com sucesso')
            window.location.href = "/feed/post"
            return res.data;
        }).catch(err => {
            alert(err)
            return err;
        });
}