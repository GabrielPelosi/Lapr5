import * as React from "react";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItemText,
  ListItemButton,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { getIdJogadorAutenticado } from '../../../utils/JogadorIDLocalStorage'
import { toJogadorDto } from "../../../dto/jogadorDto/jogadorDtoFactory";
import deleteAccount from "../../../Service/DeleteAccountService";
import { buscarJogadorPeloId } from "../../../Service/BuscarJogadorPeloIdService";
import deletePostsComentarios from '../../../Service/DeletarPostsComentarios'

const drawerWidth = 240;


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const SideMenu = () => {
  const [openVisualizacao, setOpenVisualizacao] = React.useState(false);
  const [openListagem, setOpenListagem] = React.useState(false);
  const [openAccountSettings, setAccountSettings] = React.useState(false);
  const [openTagCloud, setTagCloud] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const User_ID = getIdJogadorAutenticado();
  const [loggedUser, setLoggedUser] = React.useState({});

  const handleClickListagem = () => {
    setOpenListagem(!openListagem);
  };

  const handleClickVisualizacao = () => {
    setOpenVisualizacao(!openVisualizacao);
  };

  const handleClickAccount = () => {
    setAccountSettings(!openAccountSettings);
  };

  const handleClickCloud = () => {
    setTagCloud(!openTagCloud);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };
  const handleClose = () => {
    setIsModalVisible(false);
  };



  const handleDeleteAccount = () => {
    buscarJogadorPeloId(setLoggedUser)
    const jogadorDto = toJogadorDto(
      User_ID, loggedUser.nome, loggedUser.password,
      loggedUser.dataNascimento, loggedUser.numTelefone,
      loggedUser.email, loggedUser.descBreve, loggedUser.avatar,
      loggedUser.tagsInteresse, loggedUser.paisResidencia,
      loggedUser.localidade, loggedUser.introRequests,
      loggedUser.ligacoes, loggedUser.mood, loggedUser.intensity
    );
    deleteAccount(jogadorDto);
    deletePostsComentarios(jogadorDto);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItemButton onClick={handleClickAccount}>
              <ListItemText primary="Definições da Conta" />
              {openAccountSettings ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openAccountSettings} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link
                  to="/edit-profile"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Editar Perfil" />
                  </ListItemButton>
                </Link>

                <Link
                  to="/alterar-estado-humor"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Editar Estado de humor" />
                  </ListItemButton>
                </Link>

                <Button onClick={openModal} sx={{ pl: 0 }} color="error">Apagar Conta</Button>
                <Modal
                  title="Apagar Conta."
                  open={isModalVisible}
                  onClose={handleClose}
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Apagar conta
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Está prestes a apagar a sua conta. Deseja Continuar?
                    </Typography>
                    <Button color="error" onClick={handleDeleteAccount}>Sim</Button>
                    <Button color="primary" onClick={handleCancelDelete}>Não</Button>
                  </Box>
                </Modal>


              </List>
            </Collapse>

            <ListItemButton onClick={handleClickListagem}>
              <ListItemText primary="Listar Pedidos" />
              {openListagem ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openListagem} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link
                  to="/pedidos-pendentes-aprovar"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Pendentes Aprovar" />
                  </ListItemButton>
                </Link>
                <Link
                  to="/pedidos-pendentes-aceitar"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Pendentes Aceitar" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>

            <ListItemButton onClick={handleClickVisualizacao}>
              <ListItemText primary="Visualizar Rede" />
              {openVisualizacao ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openVisualizacao} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link
                  to="/visualizar-rede"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="2D" />
                  </ListItemButton>
                </Link>
                <Link
                  to="/visualizar-3d"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="3D" />
                  </ListItemButton>
                </Link>
                <Link
                  to="/visualizar-caminhos-3d"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Caminhos" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>

            <Link
              to="/pesquisar"
              style={{ color: "black", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemText primary="Pesquisar Jogador" />
              </ListItemButton>
            </Link>
            <Link
              to="/alterar-tags-forca"
              style={{ color: "black", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemText primary="Editar Ligações" />
              </ListItemButton>
            </Link>

            <Link
              to="/publicar-post"
              style={{ color: "black", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemText primary="Criar Post" />
              </ListItemButton>
            </Link>
            <Link to="/feed" style={{ color: "black", textDecoration: "none" }}>
              <ListItemButton>
                <ListItemText primary="Obter Feed de um utilizador" />
              </ListItemButton>
            </Link>
            <Link
              to="/leaderboards"
              style={{ color: "black", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemText primary="Consultar Leaderboards" />
              </ListItemButton>
            </Link>
            <Link
              to="/login"
              style={{ color: "black", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemText primary="Logout/Login" />
              </ListItemButton>
            </Link>

            <ListItemButton onClick={handleClickCloud}>
              <ListItemText primary="Tag Cloud" />
              {openTagCloud ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openTagCloud} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link
                  to="/my-tags-tagcloud"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="As Minhas Tags" />
                  </ListItemButton>
                </Link>

                <Link
                  to="/my-connection-tags-tagcloud"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="As Minhas Tags de Relações" />
                  </ListItemButton>
                </Link>

                <Link
                  to="/all-user-tags-tagcloud"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Tags Total" />
                  </ListItemButton>
                </Link>

                <Link
                  to="/all-connection-tags-tagcloud"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Todas as Relações" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default SideMenu;
