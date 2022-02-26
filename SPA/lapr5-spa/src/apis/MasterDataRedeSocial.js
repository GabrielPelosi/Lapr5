import axios from 'axios';
import { BASE_URL_MDRS } from './BaseUrl'


export const pesquisarJogadorPeloNome = (nome) => {
    axios.get(`${BASE_URL_MDRS}/api/Jogadores/procurarjogador/nome/${nome}`)
        .then(response => {
            console.log(response)
            return response;
        }).catch(err => {
            return err;
        });
}

export const getAllJogadores = (setJogadores) => {
    axios.get(`${BASE_URL_MDRS}/api/Jogadores`)
        .then(response => {
            setJogadores(response.data);
        }).catch(err => {
            return err;
        });
}

export const editProfile = async (userID, user) => {
    await axios.put(`${BASE_URL_MDRS}/api/Jogadores/${userID}`, user)
        .then(response => {
            console.log(response)
            return response;
        }).catch(err => {
            return err;
        });
}

export const criarIntroducao = (intro) => {
    axios.get(`${BASE_URL_MDRS}/api/IntroductionRequest`, intro)
        .then(response => {
            console.log(response)
            return response;
        }).catch(err => {
            return err;
        });
}

export const alterarTagsForca = (lig, obj) => {
    axios.put(`${BASE_URL_MDRS}/api/Ligacoes/forcatags/${lig}`, obj)
        .then(response => {
            console.log(response)
            return response;
        }).catch(err => {
            return err;
        });

}

export const getLigacoes = (setLigacoes, user) => {
    axios.get(`${BASE_URL_MDRS}/api/Ligacoes/user/${user}`)
        .then(response => {
            setLigacoes(response.data);
        }).catch(err => {
            return err;
        });
}



export const getSugestaoJogadores = async (setSugestaoJogadores, User_ID) => {
    await axios.get(`${BASE_URL_MDRS}/api/Jogadores/sugestion/${User_ID}`)
        .then((response) => {
            setSugestaoJogadores(response.data);
        }).catch((err) => alert(err));
}
