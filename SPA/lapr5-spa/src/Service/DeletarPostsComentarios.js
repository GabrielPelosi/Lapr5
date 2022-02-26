import axios from "axios";
import { BASE_URL_MDPC } from "../apis/BaseUrl";

export default async function deletePostsComentarios(jogadorDto) {
  axios
    .delete(`${BASE_URL_MDPC}/api/posts/${jogadorDto.idJog}`)
    .then(() => {
      alert("A sua conta e respetivos dados, foi apagada com sucesso.");
      window.location.href = "/login";
    })
    .catch((err) => alert(err, "Erro, tente novamente mais tarde"));
}
