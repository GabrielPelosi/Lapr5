import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

import Typography from "@mui/material/Typography";
import Text from "antd/lib/typography/Text";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@material-ui/core/Box";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { getLigacoes } from "../../../apis/MasterDataRedeSocial";
import { setLigacao } from "../../../redux/slice/EditarLigacaoSlice/LigacaoSlice";
import { getIdJogadorAutenticado } from "../../../utils/JogadorIDLocalStorage";

const useStyles = makeStyles({
  root: {
    margin: "3px",
  },
});

const ListarLigacoes = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [test, setTest] = useState([]);

  const user = getIdJogadorAutenticado();

  const handleEscolherLigacao = (lig) => {
    dispatch(setLigacao(lig));
  };

  React.useEffect(() => {
    getLigacoes(setTest, user);
  }, []);

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ marginTop: 30, minHeight: "30vh" }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <Typography style={{ marginBottom: 10 }}>
            Lista de Ligações
          </Typography>

          {test.map((lig) => (
            <>
              <ListItem alignItems="flex-start">
                <ListItemText
                  key={lig.id}
                  primary={`Ligação entre:  ${lig.jogador1UserName} e ${lig.jogador2UserName}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        <Text>{`Força de ligação:  ${lig.forcaLigacao} e  Tags: ${lig.tagsLigacao}`}</Text>
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Box m={2}>
                <Button
                  onClick={() => handleEscolherLigacao(lig)}
                  className={classes.root}
                  variant="outlined"
                  color="success"
                >
                  Escolher
                </Button>
              </Box>
              <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
      </Grid>
    </>
  );
};

export default ListarLigacoes;
