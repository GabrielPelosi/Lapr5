export const toLeaderBoardFortalezaDto = (data) =>{
    return  data.map(d => (
        {
            jogador: data.nomeJogador,
            fortaleza: data.valorFortaleza
        }
    ))
}