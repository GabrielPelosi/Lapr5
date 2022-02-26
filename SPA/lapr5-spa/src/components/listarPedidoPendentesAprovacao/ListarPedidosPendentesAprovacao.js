import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Text from 'antd/lib/typography/Text';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPedidosPendetesAprovar, setPedidosPendentes, eliminarPedidoRespondido } from '../../redux/slice/PedidosPendentesAprovarSlice/PedidosPendentesAprovarSlice';
import { buscarPedidosPendentesAprovacao, desaprovarPedido, aprovarPedido } from '../../Service/BuscarPedidosPendentesAprovacao'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ClipLoader from "react-spinners/ClipLoader";


const useStyles = makeStyles({
    root: {
        margin: '3px'
    },
});



const ListarPedidosPendentesAprovacao = () => {

    const pedidos = useSelector(selectAllPedidosPendetesAprovar);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        buscarPedidosPendentesAprovacao(dispatch, setPedidosPendentes).then(() => setLoading(false));
    }, [])

    const handleAprovarPedido = (pedido) => {
        aprovarPedido(dispatch, eliminarPedidoRespondido, pedido);
    }

    const handleDesaprovarPedido = (pedido) => {
        desaprovarPedido(dispatch, eliminarPedidoRespondido, pedido)
    }




    return (loading) ? (<Box m={15} sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}>
        <ClipLoader speed={5} />
    </Box>) : (
        <Box m={15}>
            <h2>Pedidos de introducao pendentes para você!</h2>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"

                style={{ minHeight: '100vh' }}
            >
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {
                        pedidos.map(ped => (
                            <>

                                <ListItem alignItems="flex-start">
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center' }}>
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={ped.reqUserAvatar} />
                                                <Typography sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary" >{ped.requestingUserName}</Typography>
                                            </ListItemAvatar>
                                            <ArrowForwardIcon sx={{marginTop: '15px'}}/>
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={ped.objUserAvatar} />
                                                <Typography sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary">{ped.objectiveUserName}</Typography>
                                            </ListItemAvatar>
                                        </Box>

                                        <ListItemText
                                        sx={{marginTop: '35px'}}
                                            key={ped.id}
                                            primary={`Pedido de introdução de ${ped.requestingUserName} para, ${ped.objectiveUserName}`}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >

                                                        <Text>{`Caro(a), ${ped.bridgeUserName}...`}</Text>
                                                    </Typography>
                                                    <Typography
                                                        sx={{ display: 'inline', margin: '10px' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                    {`${ped.bridgeUserText}`}</Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </Box>
                                </ListItem>

                                <Box m={2}>
                                    <Button onClick={() => handleAprovarPedido(ped)} className={classes.root} variant="outlined" color="success">
                                        Aprovar
                                    </Button>

                                    <Button onClick={() => handleDesaprovarPedido(ped)} className={classes.root} variant="outlined" color="error">
                                        Desaprovar
                                    </Button>
                                </Box>
                                <Divider variant="inset" component="li" />
                            </>
                        ))
                    }
                </List>

            </Grid>
        </Box >
    )
}

export default ListarPedidosPendentesAprovacao
