export const toLeaderBoardFortalezaDto = (data) => {
    return data.map(d => ({
        sizeValue: d.tamanho,
        playerName: d.jogador
    }))
}