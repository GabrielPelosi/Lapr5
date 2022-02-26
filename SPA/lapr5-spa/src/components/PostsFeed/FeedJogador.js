import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  Avatar,
  Grid,
  Typography,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import Text from "antd/lib/typography/Text";
import consultarPostsJogador from "../../Service/ConsultarPostsJogadorService";
import { useDispatch } from "react-redux";
import { setSelectedPost } from "../../redux/slice/SelecionarPostSlice/SelecionarPostSlice";
import { setJogadorPostSelecionado } from "../../redux/slice/JogadorPostSelecionadoSlice/JogadorPostSelecionadoSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { setPostLocalStorage } from "../../utils/SelectedPostLocalStorage";

const FeedJogador = () => {
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  const [nomeJogadorInput, setNomeJogadorInput] = useState("");
  const [dadosJogadorPesquisado, setDadosJogadorPesquisado] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setNomeJogadorInput(e.target.value);
  };
  const handleSubmitFeed = (e) => {
    e.preventDefault();
    if (nomeJogadorInput.length === 0) {
      alert("Deve indicar um nome");
      return;
    }
    setLoading(true);
    consultarPostsJogador(setPosts, nomeJogadorInput).then(() =>
      setLoading(false)
    );
  };

  const handleSelectPost = (post) => {
    dispatch(setSelectedPost(post));
    setPostLocalStorage(post);
    dispatch(setJogadorPostSelecionado(dadosJogadorPesquisado));
  };

  return loading ? (
    <Box m={15} sx={{ "& .MuiTextField-root": { m: 1, width: "50ch" } }}>
      <ClipLoader speed={5} />
    </Box>
  ) : (
    <Box m={15} sx={{ "& .MuiTextField-root": { m: 1, width: "50ch" } }}>
      <h3>Feed</h3>
      <TextField
        onChange={handleChange}
        label="Username"
        placeholder="Insira username do jogador do qual deseja obter o feed"
      />
      <br />
      <Button onClick={handleSubmitFeed}>Enviar</Button>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {posts.map((post) => (
            <>
              <ListItem alignItems="flex-start" key={post.id}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={`${post.authorAvatar}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${post.authorName}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        <Text>{`Tags: `}</Text>
                      </Typography>
                      {`${post.tags}`}
                    </React.Fragment>
                  }
                />
              </ListItem>

              <Box m={2}>
                <Link to="/feed/post">
                  <Button
                    onClick={() => handleSelectPost(post)}
                    variant="outlined"
                    color="success"
                  >
                    Visualizar Post
                  </Button>
                </Link>
              </Box>
              <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
      </Grid>
    </Box>
  );
};

export default FeedJogador;
