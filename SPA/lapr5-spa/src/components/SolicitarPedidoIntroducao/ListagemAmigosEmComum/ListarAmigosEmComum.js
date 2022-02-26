import React, { useState, useEffect } from "react";
import axios from 'axios';
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
import { getIdJogadorAutenticado } from '../../../utils/JogadorIDLocalStorage'
import { useSelector, useDispatch } from 'react-redux';
import { setObjectiveUser, selectObjectiveUser } from '../../../redux/slice/SolicitarIntroducaoSlice/ObjectiveUserSlice'
import { setBridgeUser, selectBridgeUser } from '../../../redux/slice/SolicitarIntroducaoSlice/BridgeUserSlice'
import { BASE_URL_MDRS } from '../../../apis/BaseUrl'
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
    root: {
        margin: '3px'
    },
});



const ListarAmigosEmComum = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const USER_ID = getIdJogadorAutenticado();
    const objectiveUser = useSelector(selectObjectiveUser)
    const [test, setTest] = useState([]);

    //${objectiveUser.id}/${USER_ID}
    useEffect(() => {
        axios.get(`${BASE_URL_MDRS}/api/Jogadores/amigos-em-comum/${USER_ID}/${objectiveUser.id}`)
            .then(response => {
                setTest(response.data)
            }).catch(err => {
                alert(err);
            })
    }, [])

    const handleEscolherBridgeUser = (ped) => {
        dispatch(setBridgeUser(ped));
    }



    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"

                style={{ marginTop: 30, minHeight: '30vh' }}
            >
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <Typography style={{ marginBottom: 10 }}>Lista de amigos em comum</Typography>
                    {
                        test.map(ped => (
                            <>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="https://img.freepik.com/fotos-gratis/close-up-de-uma-flor-roxa_181624-25863.jpg?size=626&ext=jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        key={ped.id}
                                        primary={`Nome: ${ped.nome}`}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    <Text>{`Caro ${ped.descBreve}...`}</Text>
                                                </Typography>
                                                {`${ped.paisResidencia}, ${ped.localidade}`}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Box m={2}>
                                    <Button onClick={() => handleEscolherBridgeUser(ped)} className={classes.root} variant="outlined" color="success">
                                        Escolher
                                    </Button>
                                </Box>
                                <Divider variant="inset" component="li" />
                            </>
                        ))
                    }
                </List>

            </Grid>
        </>
    );
}

export default ListarAmigosEmComum
