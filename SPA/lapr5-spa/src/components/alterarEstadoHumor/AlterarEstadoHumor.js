import * as React from "react";
import Select from "react-select";
import axios from "axios";
import { BASE_URL_MDRS } from '../../apis/BaseUrl';
import { getIdJogadorAutenticado } from "../../utils/JogadorIDLocalStorage";
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';

const options = [
  { value: "Alegre", label: "Alegre" },
  { value: "Angustiado", label: "Angustiado" },
  { value: "Esperançoso", label: "Esperançoso" },
  { value: "Medo", label: "Medo" },
  { value: "Aliviado", label: "Aliviado" },
  { value: "Decepcionado", label: "Decepcionado" },
  { value: "Orgulhoso", label: "Orgulhoso" },
  { value: "Arrependido", label: "Arrependido" },
  { value: "Grato", label: "Grato" },
  { value: "Nervoso", label: "Nervoso" },
];

const intensityArray = [
  { value: "0.1", label: "0.1" },
  { value: "0.2", label: "0.2" },
  { value: "0.3", label: "0.3" },
  { value: "0.4", label: "0.4" },
  { value: "0.5", label: "0.5" },
  { value: "0.6", label: "0.6" },
  { value: "0.7", label: "0.7" },
  { value: "0.8", label: "0.8" },
  { value: "0.9", label: "0.9" },
  { value: "1", label: "1" }
];

const AlterarEstadoHumor = () => {

  const [mood, setMood] = React.useState("");
  const [intensity, setIntensity] = React.useState("");

  const handleSubmit = () => {
    const User_ID = getIdJogadorAutenticado();
    const moodObject = { mood: mood, intensity: intensity }
    console.log(moodObject)
    axios
      .put(`${BASE_URL_MDRS}/api/Jogadores/mood/${User_ID}`, moodObject)
      .then((r) => alert('Estado de humor alterado!'))
      .catch((err) => {
        return err;
      });
  }


  const handleMoodChange = (event) => {
    setMood(event.value);
  };

  const handleIntensityChange = (event) => {
    setIntensity(event.value);
  };


  React.useEffect(() => {

  }, [mood, intensity]);

  return (
    <Box m={10}>
      <h2> Alterar Estado de humor </h2>
      <FormControl style={{ minWidth: 180 }}>
        <Box m={2}>
          <Select
            onChange={(e) => handleMoodChange(e)}
            value={mood}
            options={
              options.sort(function (a, b) {
                if (a.value > b.value) {
                  return 1;
                }
                if (a.value < b.value) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              })} />
          <h4>{mood}</h4>
        </Box>
        <Box m={2}>
          <Select

            options={intensityArray.sort(function (a, b) {
              if (a.value > b.value) {
                return 1;
              }
              if (a.value < b.value) {
                return -1;
              }
              // a must be equal to b
              return 0;
            })}
            onChange={handleIntensityChange}
            value={intensity}
          />
          <h4>{intensity}</h4>
        </Box>
        <Box m={2}>
          <Button onClick={() => handleSubmit()}>Enviar</Button>
        </Box>
      </FormControl>
    </Box>

  );
};

export default AlterarEstadoHumor;
