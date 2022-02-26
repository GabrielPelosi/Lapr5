import axios from 'axios';
import { BASE_URL_MDRS } from '../apis/BaseUrl'
import { getIdJogadorAutenticado } from '../utils/JogadorIDLocalStorage';


export const buscarPedidosPendentesAprovacao = async (dispatch, setPedidosPendentes) => {
    const User_ID = getIdJogadorAutenticado();
    await axios.get(`${BASE_URL_MDRS}/api/IntroductionRequest/pending/${User_ID}`)
        .then((response) => {
            dispatch(setPedidosPendentes(response.data));
        }).catch((err) => alert(err));
}



export const aprovarPedido = async (dispatch, eliminarPedidoRespondido, pedido) => {
    const body = {
        "Flag": true
    }
    await axios.put(`${BASE_URL_MDRS}/api/IntroductionRequest/updatestatus/${pedido.id}`, body)
        .then((response) => {
            dispatch(eliminarPedidoRespondido(pedido))
            alert('Pedido aprovado com sucesso!!');
        }).catch(err => alert(err));
}

export const desaprovarPedido = async (dispatch, eliminarPedidoRespondido, pedido) => {
    const body = {
        "Flag": false
    }
    await axios.put(`${BASE_URL_MDRS}/api/IntroductionRequest/updatestatus/${pedido.id}`, body)
        .then((response) => {
            dispatch(eliminarPedidoRespondido(pedido))
            alert('Pedido desaprovado com sucesso!!');
        }).catch(err => alert(err));
}