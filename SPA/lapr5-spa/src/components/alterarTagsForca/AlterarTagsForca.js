import TextField from "@material-ui/core/TextField";
import React from "react";
import { Button } from "@material-ui/core";
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import {alterarTagsForca} from '../../apis/MasterDataRedeSocial'
import ListarLigacoes from "./ListarLigacoes/ListarLigacoes";
import { selectLigacao } from "../../redux/slice/EditarLigacaoSlice/LigacaoSlice";

export const AlterarTagsForca = () => {
    const [forcaValue, setForcaValue] = React.useState("");
    const [tagsValue, setTagsValue] = React.useState("");
    const ligacaoSelected = useSelector(selectLigacao)

    const handleChangeTags = (event) => {
        event.preventDefault();
        setTagsValue(event.target.value)
    }

    const handleChangeFLigacao = (event) => {
        event.preventDefault();
        setForcaValue(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!forcaValue || forcaValue.trim() === "" || forcaValue.trim() === "0") {
            alert("Erro, força de ligação user deve existir")
            return
        } else if (!tagsValue) {
            alert("Erro, Tags devem ser preenchida")
            return
        }
        const arrTags = tagsValue.split(';');
        const obj={
            ForcaLigacao:forcaValue,
            tagsLigacao:arrTags
        }
        console.log(ligacaoSelected)
        alterarTagsForca(ligacaoSelected.id,obj);
        window.location.href = "/alterar-tags-forca"
    }

    return (
        <>
            <h2>Escolher Ligação</h2>

            <ListarLigacoes/>
            <div>
                <h1>Ligação escolhida entre:</h1>
                {ligacaoSelected.jogador1UserName}  {ligacaoSelected.jogador2UserName}
            </div>
            <Box m={6}
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <h2>Edição da Ligação Escolhida</h2>
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
                    
            </div>
            <div>
            <TextField
                        id="outlined-textarea"
                        label="Tags da ligação"
                        placeholder="C#;Tortas;Bolos"
                        onChange={handleChangeTags}
                    />
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
            
            </Box>
        </>
        
    );
};

export default AlterarTagsForca

