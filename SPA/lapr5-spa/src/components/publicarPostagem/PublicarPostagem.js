import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {getIdJogadorAutenticado} from '../../utils/JogadorIDLocalStorage'
import criarPostagem from '../../Service/CriarPostagemService'
import {toPostagemRequestDto} from '../../dto/criarPostagemDto/criarPostagemRequestDtoFactory'

const USER_ID = getIdJogadorAutenticado();


const PublicarPostagem = () => {
    const [tagsValue, setTagsValue] = React.useState('');
    const [textValue, setTextValue] = React.useState('');


    const handleTextChange = (event) => {
        setTextValue(event.target.value);
    };

    const handleTagsChange = (event) => {
        setTagsValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (textValue.length === 0 || !textValue) {
            alert("Deve indicar um texto para o seu post")
            return
        }
        const postagemRequestDto = toPostagemRequestDto(USER_ID,textValue,tagsValue);

        criarPostagem(postagemRequestDto);
        
    };

    return (
        <Box
            m={15}
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <h3>Criar nova publicação</h3>
            <div>
                <TextField
                    id="outlined-multiline-static"
                    label="*Texto"
                    multiline
                    rows={4}
                    placeholder="Hoje aprendi novas funcionalidades em Java..."
                    onChange={handleTextChange}
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="Tags de interesse"
                    multiline
                    maxRows={4}
                    placeholder="C#,Python,Java"
                    onChange={handleTagsChange}
                />

            </div>
            <Button onClick={handleSubmit} variant="contained" color="success">
                Enviar
            </Button>
        </Box>
    );
}

export default PublicarPostagem
