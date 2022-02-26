import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Text from "antd/lib/typography/Text";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";
import {
  buscarPedidosAprovados,
  aceitarPedido,
  recusarPedido,
} from "../../Service/BuscarPedidosPendentesAceitar";
import ClipLoader from "react-spinners/ClipLoader";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const useStyles = makeStyles({
  root: {
    margin: "3px",
  },
});

const ListarPedidosPendentesAceitar = () => {
  const classes = useStyles();
  const [pedidosPendentes, setPedidosPendetes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    buscarPedidosAprovados(setPedidosPendetes).then(() => setLoading(false));
  }, []);

  const handleAceitarPedido = (pedido) => {
    aceitarPedido(pedido, setPedidosPendetes);
    setPedidosPendetes(pedidosPendentes.filter((p) => p.id !== pedido.id));
  };

  const handleRecusarPedido = (pedido) => {
    recusarPedido(pedido, setPedidosPendetes);
    setPedidosPendetes(pedidosPendentes.filter((p) => p.id !== pedido.id));
  };

  return loading ? (
    <Box m={15} sx={{ "& .MuiTextField-root": { m: 1, width: "50ch" } }}>
      <ClipLoader speed={5} />
    </Box>
  ) : (
    <Box m={15}>
      <h2>Pedidos de introducao aprovados para você aceitar!</h2>
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
          {pedidosPendentes.map((ped) => (
            <>
              <ListItem alignItems="flex-start">
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={ped.reqUserAvatar} />
                    <Typography sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary" >{ped.requestingUserName}</Typography>
                  </ListItemAvatar>
                  <ArrowForwardIcon sx={{ marginTop: '15px' }} />
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={ped.objUserAvatar} />
                    <Typography sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary">{ped.objectiveUserName}</Typography>
                  </ListItemAvatar>
                </Box>
                <ListItemText
                  key={ped.id}
                  primary={`Pedidos de introdução/ligação para você ${ped.objectiveUserName}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >

                        <Text>{`De:  ${ped.requestingUserName} com introdutor: ${ped.bridgeUserName} para você...`}</Text>
                      </Typography>
                      {`${ped.objectiveUserText}`}
                    </React.Fragment>
                  }
                />
                </Box>
              </ListItem>
              <Box m={2}>
                <Button
                  onClick={() => handleAceitarPedido(ped)}
                  className={classes.root}
                  variant="outlined"
                  color="success"
                >
                  Aceitar
                </Button>

                <Button
                  onClick={() => handleRecusarPedido(ped)}
                  className={classes.root}
                  variant="outlined"
                  color="error"
                >
                  Recusar
                </Button>
              </Box>
              <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
      </Grid>
    </Box>
  );
};

export default ListarPedidosPendentesAceitar;
