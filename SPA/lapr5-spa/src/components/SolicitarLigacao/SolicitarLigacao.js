import * as React from "react";
import { BASE_URL_MDRS } from "../../apis/BaseUrl";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { selectObjectiveUserLigacao } from "../../redux/slice/SolicitarLigacaoSlice/ObjectiveUserLigacaoSlice";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getIdJogadorAutenticado } from '../../utils/JogadorIDLocalStorage';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import ClipLoader from "react-spinners/ClipLoader";


const SolicitarLigacao = () => {
  const objUser = useSelector(selectObjectiveUserLigacao);
  const User_ID = getIdJogadorAutenticado();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [fLigacao, setFLigacao] = React.useState("");
  const [msgObjectiveUser, setMsgObjectiveUser] = React.useState("");
  const [tagsLig, setTagsLig] = React.useState("");

  const handleChangeTags = (event) => {
    event.preventDefault();
    setTagsLig(event.target.value);
  };

  const handleChangeFLigacao = (event) => {
    event.preventDefault();
    setFLigacao(event.target.value);
  };

  const handleChangeMsgObjectiveUser = (event) => {
    event.preventDefault();
    setMsgObjectiveUser(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    if (!msgObjectiveUser || msgObjectiveUser.trim() === "") {
      alert("Erro! Mensagem do objective user deve existir");
      return;
    } else if (!fLigacao || fLigacao.trim() === "" || fLigacao.trim() === "0") {
      alert("Erro! força de ligação user deve existir");
      return;
    } else if (!tagsLig) {
      alert("Erro! Tags devem ser preenchidas");
    }

    const arrTags = tagsLig.split(",");
    const obj = {
      RequestingUserID: User_ID,
      ObjectiveUserID: objUser.id,
      ObjectiveUserText: msgObjectiveUser,
      IntroductionRequestTags: arrTags,
      ConnectionStrength: fLigacao,
    };

    axios
      .post(`${BASE_URL_MDRS}/api/IntroductionRequest/aprovado`, obj)
      .then((response) => {
        alert("Pedido de Ligação feita com sucesso");
        setLoading(false)
        window.location.href = "/"
      })
      .catch((err) => {
        alert("Erro na ligação");
      });
  };

  React.useEffect(() => {
    console.log(objUser);
  }, []);

  return (loading) ? (<Box m={15} sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}>
  <ClipLoader speed={5} />
</Box>) : (
    <div>
      <div>
        <h2>Jogador objetivo: {objUser.nome}</h2>
      </div>
      
      <Box m={6}
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50em' },
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
          id="outlined-multine-static"
          label="Mensagem"
          multiline
          rows={10}
          defaultValue="Pretendo fazer ligação"
          onChange={handleChangeMsgObjectiveUser}
        />
      </div>
      <div>
        <Link to="/pesquisar">
          <Button onClick={handleSubmit} variant="outlined" color="success">
            Submit
          </Button>
        </Link>
      </div>
      </Box>
    </div>
  );
};
export default SolicitarLigacao;
