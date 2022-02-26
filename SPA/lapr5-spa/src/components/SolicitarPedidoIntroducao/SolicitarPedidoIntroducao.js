import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIdJogadorAutenticado } from '../../utils/JogadorIDLocalStorage'
import { selectObjectiveUser } from '../../redux/slice/SolicitarIntroducaoSlice/ObjectiveUserSlice'
import { selectBridgeUser } from '../../redux/slice/SolicitarIntroducaoSlice/BridgeUserSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ListarAmigosEmComum from './ListagemAmigosEmComum/ListarAmigosEmComum'
import Button from '@mui/material/Button';
import { BASE_URL_MDRS } from '../../apis/BaseUrl';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";


const SolicitarPedidoIntroducao = () => {

    //const test2 = { id: "dfsdf", nome: "fsdlnfsdlfs" }
    const objUser = useSelector(selectObjectiveUser);
    const bridgeUserSelected = useSelector(selectBridgeUser)
    const dispatch = useDispatch();
    const User_ID = getIdJogadorAutenticado();
    const [loading, setLoading] = React.useState(false);
    const [fLigacao, setFLigacao] = React.useState('');
    const [tagsLig, setTagsLig] = React.useState('');
    const [msgBridgeUser, setMsgBridgeUser] = React.useState('');
    const [msgObjectiveUser, setMsgObjectiveUser] = React.useState('');


    const handleChangeTags = (event) => {
        event.preventDefault();
        setTagsLig(event.target.value)
    }

    const handleChangeMsgBridgeUser = (event) => {
        event.preventDefault();
        setMsgBridgeUser(event.target.value);
    };

    const handleChangeMsgObjectiveUser = (event) => {
        event.preventDefault();
        setMsgObjectiveUser(event.target.value);
    };

    const handleChangeFLigacao = (event) => {
        event.preventDefault();
        setFLigacao(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        if (!msgBridgeUser || msgBridgeUser.trim() === "") {
            alert("Erro, mensagem do bridge user deve existir")
            return
        } else if (!msgObjectiveUser || msgObjectiveUser.trim() === "") {
            alert("Erro, mensagem do objective user deve existir")
            return
        } else if (!fLigacao || fLigacao.trim() === "" || fLigacao.trim() === "0") {
            alert("Erro, força de ligação user deve existir")
            return
        } else if (!tagsLig) {
            alert("Erro, Tags devem ser preenchida")
            return
        }
        const arrTags = tagsLig.split(',');
        const obj = {
            RequestingUserID: User_ID,
            BridgeUserID: bridgeUserSelected.id,
            ObjectiveUserID: objUser.id,
            BridgeUserText: msgBridgeUser,
            ObjectiveUserText: msgObjectiveUser,
            IntroductionRequestTags: arrTags,
            ConnectionStrength: fLigacao,
        }

        axios.post(`${BASE_URL_MDRS}/api/IntroductionRequest`, obj)
            .then(response => {
                alert('Pedido Criado com sucesso')
                setLoading(false)
                window.location.href = "/"
            }).catch(err => {
                alert('erro ao criar pedido, tente novamente mais tarde')
                window.location.href = "/"
            });
    }


    useEffect(() => {
        console.log(objUser)
    }, [])

    return (loading) ? (<Box m={15} sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}>
    <ClipLoader speed={5} />
  </Box>) : (
        <div>
            <div>
                <h2>Jogador objetivo: {objUser.nome}</h2>
            </div>
            <div>
                <ListarAmigosEmComum />
            </div>
            <div>
                <h1>Usuário intermédio escolhido</h1>
                {bridgeUserSelected.nome}
            </div>
            <Box m={6}
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '30ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Força de Ligação"
                        placeholder="33"
                        type="number"
                        InputProps={{ inputProps: { min: 1, max: 999 } }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChangeFLigacao}
                    />
                    <TextField
                        id="outlined-textarea"
                        label="Tags da ligação"
                        placeholder="C#,Tortas,Bolos"
                        onChange={handleChangeTags}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-multiline-static"
                        label="Mensagem ao BridgeUser"
                        multiline
                        rows={10}
                        defaultValue="Olá,como vai?"
                        onChange={handleChangeMsgBridgeUser}
                    />
                    <TextField
                        id="outlined-multiline-static-2"
                        label="Mensagem ao Objective User"
                        multiline
                        rows={10}
                        defaultValue="Olá,como vai?"
                        onChange={handleChangeMsgObjectiveUser}
                    />
                </div>
                <div>
                    <Link to="/pesquisar">
                        <Button onClick={handleSubmit} variant="outlined" color="success">Submit</Button>
                    </Link>
                </div>
            </Box>
        </div>
    )
}

export default SolicitarPedidoIntroducao
