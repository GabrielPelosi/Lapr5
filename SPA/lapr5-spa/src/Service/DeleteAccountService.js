import axios from "axios";
import { BASE_URL_MDRS } from "../apis/BaseUrl";

export default async function deleteAccount(jogadorDto) {
  axios
    .delete(`${BASE_URL_MDRS}/api/Jogadores/${jogadorDto.idJog}`, jogadorDto)
    .then(() => {
      
    })
    .catch((err) => alert(err, "Ocorreu um erro, tentar novamente mais tarde"));
}
