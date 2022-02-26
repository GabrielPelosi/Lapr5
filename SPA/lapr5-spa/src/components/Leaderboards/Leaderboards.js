import * as React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { LeaderBoardFortalezaInitialState } from '../../dto/leaderBoardFortalezaDto/LeaderBoardFortalezaInitialState'
import getLeaderboardFortaleza from '../../Service/ConsultarLeaderBoardFortalezaService'
import { LBTamanhoInitialState } from '../../dto/LeaderboardTamanhoDto/LBTamanhoInitialState'
import getLeaderboardTamanho from '../../Service/ConsultarLBTamanhoService'
import ClipLoader from "react-spinners/ClipLoader";

const Leaderboards = () => {

    const [leaderboardFortaleza, setLeaderboardFortaleza] = React.useState(LeaderBoardFortalezaInitialState);
    const [leaderboardTamanho, setLeaderboardTamanho] = React.useState(LBTamanhoInitialState);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(true);
        getLeaderboardFortaleza(setLeaderboardFortaleza);
        getLeaderboardTamanho(setLeaderboardTamanho).then(() => setLoading(false));
    }, [])

    return (loading) ? (<Box m={15} sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}>
    <ClipLoader speed={5} />
</Box>) : (
        <Box m={10} sx={{display: 'flex'}}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                style={{ minHeight: '10vh' }}>

                <h3>Leaderboard: Fortaleza de Rede</h3>
                {leaderboardFortaleza.map((dado) => (
                    <Card sx={{ margin: 1, minWidth: 275, maxWidth: 300 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {dado.nomeJogador}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {dado.valorFortaleza}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Grid>

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                style={{ minHeight: '10vh' }}>

                <h3>Leaderboard: Dimensão de Rede</h3>
                {leaderboardTamanho.map((d) => (
                    <Card sx={{ margin: 1, minWidth: 275, maxWidth: 300 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {d.playerName}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {d.sizeValue}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
        </Box>
    )
}

export default Leaderboards