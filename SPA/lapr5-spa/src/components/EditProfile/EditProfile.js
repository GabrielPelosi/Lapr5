/* IMPORTS */
import * as React from 'react';
import { Avatar, Button, CssBaseline, Grid, Box, Typography, Container } from '@mui/material';
import { editProfile } from '../../apis/MasterDataRedeSocial';
import { getIdJogadorAutenticado } from '../../utils/JogadorIDLocalStorage'
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL_MDRS } from '../../apis/BaseUrl';
import ClipLoader from "react-spinners/ClipLoader";
import './EditProfile.css'

/* DATA */
const EditProfileComp = () => {

  // GET LOGGED USER
  const UserID = getIdJogadorAutenticado();
  const [userSelected, setUserSelected] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  // DISPLAY USERNAME
  //var username = userSelected.email.substring(0, userSelected.email.lastIndexOf("@"))

  // HANDLE CHANGE
  const handleAvatarChange = (event) => {
    const obj_clone = { ...userSelected };
    obj_clone.avatar = event.target.value;
    setUserSelected(obj_clone)
    console.log(userSelected)
  };

  const handleNameChange = (event) => {
    const obj_clone = { ...userSelected };
    obj_clone.nome = event.target.value;
    setUserSelected(obj_clone)
    console.log(userSelected)
  };

  const handleEmailChange = (event) => {
    const obj_clone = { ...userSelected };
    obj_clone.email = event.target.value;
    setUserSelected(obj_clone)
    console.log(userSelected)
  };

  const handlePhoneNumberChange = (event) => {
    const obj_clone = { ...userSelected };
    obj_clone.numTelefone = event.target.value;
    setUserSelected(obj_clone)
    console.log(userSelected)
  };

  const handleDateOfBirthChange = (event) => {
    const obj_clone = { ...userSelected };
    obj_clone.dataNascimento = event.target.value;
    setUserSelected(obj_clone)
    console.log(userSelected)

  };

  const handleCountryChange = (event) => {
    const obj_clone = { ...userSelected };
    obj_clone.paisResidencia = event.target.value;
    setUserSelected(obj_clone)
    console.log(userSelected)
  };

  const handleCityChange = (event) => {
    const obj_clone = { ...userSelected };
    obj_clone.localidade = event.target.value;
    setUserSelected(obj_clone)
    console.log(userSelected)

  };

  const handleBioChange = (event) => {
    const obj_clone = { ...userSelected };
    obj_clone.descBreve = event.target.value;
    setUserSelected(obj_clone)
    console.log(userSelected) 
  };

  const handleInterestChange = (event) => { 
    const obj_clone = { ...userSelected };
    const arrTags = event.target.value;
    obj_clone.tagsInteresse = arrTags.split(',');
    setUserSelected(obj_clone)
    console.log(userSelected)
  };


  // USE EFFECT
  useEffect(() => {
    axios.get(`${BASE_URL_MDRS}/api/Jogadores/${UserID}`)
      .then((response) => {
        console.log(response.data);
        setUserSelected(response.data);
      }).catch((err) => alert(err));
  }, []);

  // ON SUBMIT
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    if(!Array.isArray(userSelected.tagsInteresse)){
      userSelected.tagsInteresse = userSelected.tagsInteresse.split(',');
      alert(userSelected[0]);
    }
    const obj = {
      Nome:  userSelected.nome,
      DataNascimento:  userSelected.dataNascimento,
      NumTelefone: userSelected.numTelefone,
      Email:  userSelected.email,
      DescBreve:userSelected.descBreve,
      Avatar: userSelected.avatar,
      TagsInteresse: userSelected.tagsInteresse,
      PaisResidencia: userSelected.paisResidencia,
      Localidade:  userSelected.localidade
    }
    editProfile(UserID, obj).then(() => {
      setLoading(false)
      alert("Perfil editado com sucesso")
      window.location.href = "/"
    }); //AXIOS PUT
  }

  /* PAGE CONTENT */
  return (loading) ? (<Box m={15} sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}>
  <ClipLoader speed={5} />
</Box>) :  (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box sx={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
        <Typography component="h1" variant="h5">Editar Perfil</Typography>

        <Avatar sx={{ marginTop: 2, height: '70px', width: '70px' }} alt="Remy Sharp" src={userSelected.avatar} ></Avatar>

        {<Typography component="h6" >{userSelected.email}</Typography>}

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <label>Nome: </label>
              <input
                name="name"
                id="name"
                maxLength="100"
                defaultValue={userSelected.nome}
                onChange={handleNameChange}
              />
            </Grid>

            <Grid item xs={12}>
              <label>Endereço Email: </label>
              <input
                required
                id="email"
                name="email"
                defaultValue={userSelected.email}
                margin="dense"
                onChange={handleEmailChange}
              />

            </Grid>

            <Grid item xs={12}>
              <label>Número Telefone: </label>
              <input
                name="phoneNumber"
                id="phoneNumber"
                placeholder="e.g. +351912345678"
                defaultValue={userSelected.numTelefone}
                onChange={handlePhoneNumberChange}
              />
            </Grid>

            <Grid item xs={12}>
              <label>Data de Nascimento: </label>
              <input
                required
                name="dateOfBirth"
                id="dateOfBirth"
                placeholder="mm/dd/yyyy"
                defaultValue={userSelected.dataNascimento}
                onChange={handleDateOfBirthChange}
              />
            </Grid>

            <Grid item xs={12}>
              <label>País de Residência: </label>
              <input
                name="country"
                id="country"
                placeholder="e.g. Portugal, Spain, United States Of America"
                defaultValue={userSelected.paisResidencia}
                onChange={handleCountryChange}
              />
            </Grid>

            <Grid item xs={12}>
              <label>Localidade: </label>
              <input
                name="city"
                id="city"
                defaultValue={userSelected.localidade}
                onChange={handleCityChange}
              />
            </Grid>

            <Grid item xs={12}>
              <label>Descrição Breve: </label>
              <textarea
                name="bio"
                id="bio"
                maxLength="4000"
                defaultValue={userSelected.descBreve}
                onChange={handleBioChange}
              />
            </Grid>

            <Grid item xs={12}>
              <label>Interesses: </label>
              <textarea
                required
                id="tags"
                name="tags"
                margin="dense"
                placeholder="e.g. Music,Games,Food,etc"
                defaultValue={userSelected.tagsInteresse}
                onChange={handleInterestChange}
              />
            </Grid>

            <Grid item xs={12}>
              <label>Avatar: </label>
              <input
                name="avatar"
                id="avatar"
                placeholder="Insert link to the image you'd like as your Avatar"
                defaultValue={userSelected.avatar}
                onChange={handleAvatarChange}
              />
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button variant="contained" onClick={handleSubmit} color="primary">Confirmar</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
export default EditProfileComp;