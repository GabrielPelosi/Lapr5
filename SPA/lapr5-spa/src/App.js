import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListarPedidosPendentesAprovacao from './components/listarPedidoPendentesAprovacao/ListarPedidosPendentesAprovacao';
import ListarPedidosPendentesAceitar from './components/listarPedidosPendentesAceitar/ListarPedidosPendentesAceitar';
import SolicitarPedidoIntroducao from './components/SolicitarPedidoIntroducao/SolicitarPedidoIntroducao'
import LoginJogador from './components/LoginJogador/LoginJogador';
import RegisterUser from './components/RegisterUser/RegisterUser';
import EditProfile from './components/EditProfile/EditProfile';
import ListarSugestaoJogadores from './components/listarSugestaoJogadores/ListarSugestaoJogadores';
import AlterarTagsForca from './components/alterarTagsForca/AlterarTagsForca';
import VisualizarRedeSocial from './components/VizualizarRedeSocial/VisualizarRedeSocial'
import NavBar from './components/NavBar/NavBar'
import PesquisarJogadorParaLigar from './components/pesquisarJogadorParaLigar/PesquisarJogadorParaLigar';
import AlterarEstadoHumor from './components/alterarEstadoHumor/AlterarEstadoHumor';
import PaginaPrincipal from './components/PaginaPrincipal/PaginaPrincipal'
import SolicitarLigacao from './components/SolicitarLigacao/SolicitarLigacao';
import VisualizarRedeSocial3D from './components/VizualizarRedeSocial/VisualizarRedeSocial3D';
import PublicarPostagem from './components/publicarPostagem/PublicarPostagem';
import Leaderboards from './components/Leaderboards/Leaderboards';
import FeedJogador from './components/PostsFeed/FeedJogador';
import PostJogador from './components/PostsFeed/PostJogador';
import MyTagsCloud from './components/TagClouds/TagCloudTagsUtilizador';
import TagCloudJogadores from './components/TagClouds/tagCloudJogadores';
import VisualizarCaminhos3D from './components/VizualizarRedeSocial/VisualizarCaminhos3D';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/pedidos-pendentes-aprovar" element={<ListarPedidosPendentesAprovacao />} />
          <Route path="/pedidos-pendentes-aceitar" element={<ListarPedidosPendentesAceitar />} />
          <Route path="/solicitar-introducao" element={<SolicitarPedidoIntroducao />} />
          <Route path="/sugestao-jogadores" element={<ListarSugestaoJogadores />} />
          <Route path="/alterar-tags-forca" element={<AlterarTagsForca />} />
          <Route path="/login" element={<LoginJogador />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/visualizar-rede" element={<VisualizarRedeSocial />} />
          <Route path="/pesquisar" element={<PesquisarJogadorParaLigar />} />
          <Route path="/alterar-estado-humor" element={<AlterarEstadoHumor />} />
          <Route path="/solicitar-ligacao" element={<SolicitarLigacao />} />
          <Route path="/visualizar-3d" element={<VisualizarRedeSocial3D />} />
          <Route path="/publicar-post" element={<PublicarPostagem />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/feed" element={<FeedJogador />} />
          <Route path="/feed/post" element={<PostJogador />} />
          <Route path="/my-tags-tagcloud" element={<MyTagsCloud />} />
          <Route path="/all-user-tags-tagcloud" element={<TagCloudJogadores />} />
          <Route path="/visualizar-caminhos-3d" element={<VisualizarCaminhos3D/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
