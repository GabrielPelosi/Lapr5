import { configureStore } from '@reduxjs/toolkit';
import pedidosPendentesAprovarReducer from './slice/PedidosPendentesAprovarSlice/PedidosPendentesAprovarSlice';
import objectiveUserReducer from './slice/SolicitarIntroducaoSlice/ObjectiveUserSlice';
import bridgeUserReducer from './slice/SolicitarIntroducaoSlice/BridgeUserSlice'
import ligacaoReducer from './slice/EditarLigacaoSlice/LigacaoSlice'
import objectiveUserLigacaoReducer from './slice/SolicitarLigacaoSlice/ObjectiveUserLigacaoSlice';
import selectedPostReducer from './slice/SelecionarPostSlice/SelecionarPostSlice'
import jogadorPostSelecionadoReducer from './slice/JogadorPostSelecionadoSlice/JogadorPostSelecionadoSlice'

export default configureStore({
  reducer: {
    pedidosPendentesAprovar: pedidosPendentesAprovarReducer,
    objectiveUser: objectiveUserReducer,
    bridgeUser: bridgeUserReducer,
    ligacao: ligacaoReducer,
    objectiveUserLigacao: objectiveUserLigacaoReducer,
    selectedPost: selectedPostReducer,
    jogadorPostSelecionado: jogadorPostSelecionadoReducer,
  },
});
