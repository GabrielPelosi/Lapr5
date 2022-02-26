

export const getIdJogadorAutenticado = () => {
    return localStorage.getItem('jogador-id');
}

export const setIdJogadorAuthenticado = (id) =>{
    console.log(id)
    localStorage.setItem('jogador-id', id);
}
