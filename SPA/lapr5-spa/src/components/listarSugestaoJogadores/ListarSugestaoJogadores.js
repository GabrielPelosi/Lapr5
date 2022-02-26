import React, { useState } from 'react';
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
import { getIdJogadorAutenticado } from '../../utils/JogadorIDLocalStorage'
import { getSugestaoJogadores } from '../../apis/MasterDataRedeSocial'
import { setObjectiveUserLigacao } from '../../redux/slice/SolicitarLigacaoSlice/ObjectiveUserLigacaoSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

const User_ID = getIdJogadorAutenticado();


const useStyles = makeStyles({
    root: {
        margin: '3px'
    },
});



const ListarSugestaoJogadores = () => {

    const classes = useStyles();
    const dispatch = useDispatch();


    const [sugestaoJogadores, setSugestaoJogadores] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleEscolherSugestaoLigacao = (sug) => {
        dispatch(setObjectiveUserLigacao(sug));
    }

    React.useEffect(() => {
        setLoading(true)
        getSugestaoJogadores(setSugestaoJogadores, User_ID).then(() => setLoading(false));
    }, [])



    return (loading) ? (<Box m={15} sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}>
        <ClipLoader speed={5} />
    </Box>) : (
        <Box m={15}>
            <h2>Lista de Sugestão de Jogadores!</h2>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"

                style={{ minHeight: '100vh' }}
            >
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {
                        sugestaoJogadores.map(sug => (
                            <>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={`${sug.avatar}`} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        key={sug.id}
                                        primary={`${sug.nome}`}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    <Text>{`Email: `}</Text>
                                                </Typography>
                                                {`${sug.email}`}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Box m={2}>
                                    <Link to="/solicitar-ligacao">
                                        <Button onClick={() => handleEscolherSugestaoLigacao(sug)} className={classes.root} variant="outlined" color="success">
                                            Pedir Ligação
                                        </Button>
                                    </Link>
                                </Box>
                                <Divider variant="inset" component="li" />
                            </>
                        ))
                    }
                </List>

            </Grid>
        </Box>
    )
}

export default ListarSugestaoJogadores
