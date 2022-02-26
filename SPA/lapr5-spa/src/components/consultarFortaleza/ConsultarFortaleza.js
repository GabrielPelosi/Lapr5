import getFortalezaPorJogador from '../../Service/ConsultarFortalezaService'
import React from 'react'


const ConsultarFortaleza = () => {

    const [dadosFortaleza , setDadosFortaleza] = React.useState({
        valorFortaleza: 0,
        nomeJogador: ''
    });

    React.useEffect( async () => {
        await getFortalezaPorJogador(setDadosFortaleza);
    },[])

    return (
        <div>
            <h2>{dadosFortaleza.valorFortaleza}</h2>
            <h2>{dadosFortaleza.nomeJogador}</h2>
        </div>
    )
}

export default ConsultarFortaleza
