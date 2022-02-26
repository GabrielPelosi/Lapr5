import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Text from 'antd/lib/typography/Text';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import { BASE_URL_MDRS } from '../../apis/BaseUrl'
import {useDispatch } from 'react-redux';
import { setObjectiveUser } from '../../redux/slice/SolicitarIntroducaoSlice/ObjectiveUserSlice'
import { Link } from 'react-router-dom';
import {getIdJogadorAutenticado} from '../../utils/JogadorIDLocalStorage'
import {setObjectiveUserLigacao} from '../../redux/slice/SolicitarLigacaoSlice/ObjectiveUserLigacaoSlice';

const useStyles = makeStyles({
    root: {
        margin: '3px'
    },
});



const PesquisarJogadorParaLigar = () => {
    const User_ID = getIdJogadorAutenticado();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [pesquisado, setPesquisado] = React.useState(false);
    const [nome, setNome] = React.useState('');
    const [jogadoresNomes, setJogadores] = React.useState({});

    const handleChangeNome = (event) => {
        setNome(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get(`${BASE_URL_MDRS}/api/Jogadores/procurarjogador/nome/${nome}`)
            .then(response => {
                if(response.data.id !== User_ID){
                    setJogadores(response.data);
                    setPesquisado(true);
                }else{
                    alert('você não pode pesquisar a si próprio')
                }
            }).catch(err => {
                setJogadores({});
                setPesquisado(false);
                alert("Jogador não encontrado")
            });
    }



    const handleAceitarPedido = (pedido) => {
        dispatch(setObjectiveUserLigacao(pedido));
    }

    const handleSolicitarIntro = (objUser) => {
        dispatch(setObjectiveUser(objUser))
    }


    return (
        <div>
            <Box m={15}>
                <OutlinedInput
                    value={nome}
                    onChange={handleChangeNome}
                />
                <Button onClick={handleSubmit}>Pesquisar</Button>
            </Box>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"

                style={{ minHeight: '100vh' }}
            >
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {
                        pesquisado === false ? "Nenhum jogador pesquisado/encontrado ainda" :
                            // color is undefined
                            <>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={jogadoresNomes.avatar}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        key={jogadoresNomes.id}
                                        primary={`Nome: ${jogadoresNomes.nome}`}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    <Text>{`email: ${jogadoresNomes.email}...`}</Text><br></br>
                                                </Typography>
                                                {`${jogadoresNomes.descBreve}`}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Box m={2}>
                                    <Link to="/solicitar-ligacao">
                                        <Button onClick={() => handleAceitarPedido(jogadoresNomes)} className={classes.root} variant="outlined" color="success">
                                            Pedir Ligação
                                        </Button>
                                    </Link>

                                    <Link to="/solicitar-introducao">
                                        <Button onClick={() => handleSolicitarIntro(jogadoresNomes)} className={classes.root} variant="outlined" color="error">
                                            Pedir Introdução
                                        </Button>
                                    </Link>
                                </Box>
                                <Divider variant="inset" component="li" />
                            </>
                    }
                </List>

            </Grid>
        </div>
    )
}

export default PesquisarJogadorParaLigar
