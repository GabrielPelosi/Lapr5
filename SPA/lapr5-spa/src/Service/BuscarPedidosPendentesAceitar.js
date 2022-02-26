import axios from 'axios';
import { BASE_URL_MDRS } from '../apis/BaseUrl'
import { getIdJogadorAutenticado } from '../utils/JogadorIDLocalStorage';


export const buscarPedidosAprovados = async (setPedidosAprovados) => {
    const User_ID = getIdJogadorAutenticado();
    await axios.get(`${BASE_URL_MDRS}/api/IntroductionRequest/approved/${User_ID}`)
        .then((response) => {
            setPedidosAprovados(response.data)
        }).catch(err => alert(err));
}

export const aceitarPedido = async (pedido) => {
    const body = {
        "Flag": true
    }
    await axios.put(`${BASE_URL_MDRS}/api/IntroductionRequest/updatestatusar/${pedido.id}`, body)
        .then((response) => {
            //dispatch(eliminarPedidoRespondido(pedido))
            alert('Pedido aceito com sucesso!!');
        }).catch(err => alert(err));
}

export const recusarPedido = async (pedido) => {
    const body = {
        "Flag": false
    }
    await axios.put(`${BASE_URL_MDRS}/api/IntroductionRequest/updatestatusar/${pedido.id}`, body)
        .then((response) => {
            //dispatch(eliminarPedidoRespondido(pedido))
            alert('Pedido recusado com sucesso!!');
        }).catch(err => alert(err));
}