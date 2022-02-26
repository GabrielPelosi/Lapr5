import * as React from 'react';
import { Box, Toolbar, Grid, Card, CardContent, Avatar, Typography, } from '@mui/material';
import SideMenu from './sideMenu/SideMenu'
import { buscarJogadorPeloId } from '../../Service/BuscarJogadorPeloIdService'
import getFortalezaPorJogador from '../../Service/ConsultarFortalezaService'
import { FortalezaInit } from '../../dto/fortalezaDto/FortalezaDtoInitialState'
import { SizeInitialState } from '../../dto/TamanhoDto/TamanhoDtoInitialState'
import getTamanhoRede from '../../Service/ConsultarTamanhoService';
import { getTamanhoRedeTotal } from '../../Service/ConsultarTamanhoRedeTotalService'
import { tamanhoRedeTotalInitialState } from '../../dto/TamanhoRedeTotalDto/TamanhoRedeTotalInitialState'
import ClipLoader from "react-spinners/ClipLoader";



export default function ClippedDrawer() {

    const [expanded, setExpanded] = React.useState(false);
    const [loading, setLoading] = React.useState(true);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [currentUser, setCurrentUser] = React.useState({});
    const [fortaleza, setFortaleza] = React.useState(FortalezaInit);
    const [tamanho, setTamanho] = React.useState(SizeInitialState);
    const [tamanhoRedeTotal, setTamanhoRedeTotal] = React.useState(tamanhoRedeTotalInitialState);

    React.useEffect(async () => {
        setLoading(true)
        await Promise.all([
            buscarJogadorPeloId(setCurrentUser),
            getFortalezaPorJogador(setFortaleza),
            getTamanhoRedeTotal(setTamanhoRedeTotal),
            getTamanhoRede(setTamanho),
        ]).then(() => setLoading(false))
    }, [])


    const dadosPerfil = [
        { titulo: "Descrição Breve", conteudo: currentUser.descBreve },
        { titulo: "Contacto", conteudo: (currentUser.numTelefone) ?
                                    ([currentUser.numTelefone.slice(0,4), '-', currentUser.numTelefone.slice(4,7), '-', currentUser.numTelefone.slice(7,10), '-', currentUser.numTelefone.slice(10)].join('')) : '' },
        { titulo: "País", conteudo: currentUser.paisResidencia },
        { titulo: "Localidade", conteudo: currentUser.localidade },
        { titulo: "Estado de Humor", conteudo: currentUser.mood },
        { titulo: "Intensidade do Humor", conteudo: currentUser.intensity },
        //{ titulo: "Tags", conteudo: currentUser.tagsInteresse },
        { titulo: "Fortaleza", conteudo: fortaleza.valorFortaleza },
        { titulo: "Tamanho da sua Rede", conteudo: tamanho.sizeValue },
        { titulo: "Tamanho Rede do sistema", conteudo: tamanhoRedeTotal.tamanhoRedeTotal }//retirar e fazer layour proprio
        //adicionar tamanho da rede e tags cloud também futuramente
    ]

    return (loading) ? (<Box m={15} sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}>
        <SideMenu />
        <ClipLoader speed={5} />
    </Box>) : (
        <Box sx={{ display: 'flex' }}>
            <SideMenu />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"

                    style={{ minHeight: '10vh' }}
                >
                    <Toolbar />
                    <Avatar src={currentUser.avatar} sx={{ width: 110, height: 110 }} aria-label="recipe" />
                    <Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom>
                        {currentUser.nome}
                    </Typography>
                </Grid>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    style={{ minHeight: '10vh' }}
                >
                    {dadosPerfil.map((dado) => (
                        <Card sx={{ margin: 1, minWidth: 275, maxWidth: 300 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {dado.titulo}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {dado.conteudo}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
                <h3>Tags de interesse</h3>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    style={{ minHeight: '10vh' }}
                >
                    
                    {
                        currentUser.tagsInteresse.map((t) => (
                            <Card sx={{ margin: 1, minWidth: 275, maxWidth: 300 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {t}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    );
}