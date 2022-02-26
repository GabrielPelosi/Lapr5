export const toTamanhoDto = (data) =>{
    return  {
        sizeValue: data.tamanho,
        playerName: data.jogador,
    }
}