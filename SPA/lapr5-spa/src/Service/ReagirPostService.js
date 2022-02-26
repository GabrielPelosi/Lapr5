import axios from 'axios'
import { BASE_URL_MDPC } from '../apis/BaseUrl'


export default async function reagirPost(reactionDto) {
    await axios.put(`${BASE_URL_MDPC}/api/posts/reaction`,reactionDto)
        .then(()=> {
            alert("Post reagido")
            //window.location.href = "/feed/post"
        })
        .catch(err => alert(err))
}