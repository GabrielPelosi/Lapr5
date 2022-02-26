/* IMPORTS */
import * as React from 'react';
import axios from 'axios';
import { BASE_URL_MDRS } from '../../apis/BaseUrl';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Tab, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from 'moment';
import { setLoggedUser } from "../../redux/slice/RegisterUserSlice/LoggedUserSlice";
import { setIdJogadorAuthenticado } from '../../utils/JogadorIDLocalStorage'
import { useDispatch } from 'react-redux';

/* DATA */
//P@ssword2021
const RegisterUserComp = () => {

  //USER PARAMETERS
  const [value, setTabValue] = React.useState('1');
  const [avatar, setAvatar] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [city, setCity] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [tagsOfInterests, setTag] = React.useState('');

  const dispatch = useDispatch();

  //HANDLE CHANGE
  const handleAvatarChange = (event) => { setAvatar(event.target.value); };
  const handleNameChange = (event) => { setName(event.target.value); };
  const handlePasswordChange = (event) => { setPassword(event.target.value); };
  const handleEmailChange = (event) => { setEmail(event.target.value); };
  const handlePhoneNumberChange = (event) => { setPhoneNumber(event.target.value); };
  const handleDateOfBirthChange = (event) => { setDateOfBirth(event.target.value); };
  const handleCountryChange = (event) => { setCountry(event.target.value); };
  const handleCityChange = (event) => { setCity(event.target.value); };
  const handleBioChange = (event) => { setBio(event.target.value); };
  const handleInterestChange = (event) => { setTag(event.target.value); };
  const handleTabChange = (event, newTabValue) => {
    event.preventDefault();
    setTabValue(newTabValue);
  };

  //VALIDATIONS: mandatory email, password, date of birth, interests & terms agreement
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email é obrigatório')
      .email('Email é inválido'),
    password: Yup.string()
      .required('Password é obrigatória')
      .min(8, 'Password deve ter pelo menos 8 caracteres')
      .max(40, 'Password não deve ultrupassar os 40 caracteres')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password deve ter pelo menos 8 caracteres, 1 algarismo, 1 letra minúscula, 1 letra maiúscula e 1 caracter especial'),
    confirmPassword: Yup.string()
      .required('Confirmar Password é obrigatório')
      .oneOf([Yup.ref('password'), null], 'As passwords não coincidem'),
    dateOfBirth: Yup.string()
      .required('Data de Nascimento é obrigatória')
      .test('is-of-age', 'Deve ter pelo menos 16 anos para se registar', val => {
        return moment().diff(moment(val), 'years') >= 16
      }),
    tags: Yup.string()
      .required('Interesses são obrigatórios')
      .max(255, '')
      .matches(/^([a-zA-Z0-9]+,?s*)+$/, 'Os Interesses devem ser alfanuméricos e não devem conter espaços entre as tags'),
    acceptTerms: Yup.bool().oneOf([true])
  });

  //IMPORTANT CONSTANTS
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = () => {
    const arrTagsOfInterests = tagsOfInterests.split(",");
    const obj = {
      Nome: name,
      Password: password,
      DataNascimento: dateOfBirth,
      NumTelefone: phoneNumber,
      Email: email,
      DescBreve: bio,
      Avatar: avatar,
      TagsInteresse: arrTagsOfInterests,
      PaisResidencia: country,
      Localidade: city
    }
    axios.post(`${BASE_URL_MDRS}/api/Jogadores`, obj)
      .then(response => {
        dispatch(setLoggedUser(response.data))
        setIdJogadorAuthenticado(response.data.id)
        alert('Successful Registration')
        window.location.href = "/sugestao-jogadores"
      })
      .catch(error => {
        alert(error, 'ERROR! Couldn\'t complete User Registration')
      });

  }

  /* PAGE CONTENT */
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box sx={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
        <Typography component="h1" variant="h5">Registe a sua conta</Typography>

        <Avatar sx={{ height: '70px', width: '70px' }} alt="Remy Sharp" src={avatar} ></Avatar>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="Nome"
                multiline
                rows={1}
                rowsmax={2}
                inputProps={{ maxLength: 100 }}
                onChange={handleNameChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Endereço Email"
                fullWidth
                margin="dense"
                {...register('email')}
                error={errors.email ? true : false}
                onChange={handleEmailChange}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                margin="dense"
                autoComplete="new-password"
                {...register('password')}
                error={errors.password ? true : false}
                onChange={handlePasswordChange}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirmar Password"
                type="password"
                fullWidth
                margin="dense"
                {...register('confirmPassword')}
                error={errors.confirmPassword ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.confirmPassword?.message}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="phoneNumber"
                name="phoneNumber"
                fullWidth
                id="phoneNumber"
                label="Número Telefone"
                placeholder="e.g. +351912345678"
                onChange={handlePhoneNumberChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                name="dateOfBirth"
                fullWidth
                id="dateOfBirth"
                label="Data de Nascimento"
                placeholder="mm/dd/yyyy"
                {...register('dateOfBirth')}
                error={errors.dateOfBirth ? true : false}
                onChange={handleDateOfBirthChange}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.dateOfBirth?.message}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="country"
                name="country"
                fullWidth
                id="country"
                label="País de Residência"
                placeholder="e.g. Portugal, Spain, United States of America"
                onChange={handleCountryChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="city"
                name="city"
                fullWidth
                id="city"
                label="Localidade"
                onChange={handleCityChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                multiline
                rows={2}
                rowsmax={8}
                inputProps={{ maxLength: 4000 }}
                autoComplete="bio"
                name="bio"
                fullWidth
                id="bio"
                label="Descrição Breve"
                onChange={handleBioChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="tags"
                name="tags"
                label="Interesses"
                fullWidth
                margin="dense"
                placeholder="e.g. Music,Games,Food,etc"
                {...register('tags')}
                error={errors.tags ? true : false}
                onChange={handleInterestChange}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.tags?.message}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="avatar"
                fullWidth
                id="avatar"
                label="Avatar"
                placeholder="Insert link to the image you'd like as your Avatar"
                onChange={handleAvatarChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ marginTop: 1, width: '100%', typography: 'body1', border: 1, borderColor: 'divider' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList centered onChange={handleTabChange}>
                      <Tab label="Tratamento de Dados" value="1" />
                      <Tab label="Dados recolhidos" value="2" />
                      <Tab label="Finalidade" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel align="justify" value="1">
                    A Graph4Social é responsável pelo tratamento dos dados fornecidos. Todas as informações são tratadas com o devido cuidado e é um processo muito seguro e transparente.
                    Caso pretenda contactar o responsável pelo tratamento dos dados, basta contactar por telefone ou correio eletrónico através de graph4social@gmail.com ou 222397882.</TabPanel>
                  <TabPanel align="justify" value="2"> Os dados obrigatórios recolhidos no momento do registo são o endereço de email, password, data de nascimento e os interesses do utilizador. Os restantes campos são opcionais, mas
                    caso sejam inseridos, são também registados na nossa base de dados. </TabPanel>
                  <TabPanel align="justify" value="3"> O email e password são necessários para permitir o registo e login do utilizador na aplicação, assim como
                    verificar a identidade do mesmo. A data de nascimento permite verificar a idade de um utilizador, pois este deve ter pelo menos 16 anos para se registar na aplicação. 
                    Os interesses do utilizador permitem que outros utilizadores encontrem outros com interesses em comum e possam assim realizar uma ligação se desejado.</TabPanel>
                </TabContext>
              </Box>

              <FormControlLabel
                control={
                  <Controller
                    control={control}
                    name="acceptTerms"
                    defaultValue="false"
                    inputRef={register()}
                    render={({ field: { onChange } }) => (<Checkbox color="primary" onChange={e => onChange(e.target.checked)} />)}
                  />
                }
                label={<Typography color={errors.acceptTerms ? 'error' : 'inherit'}>Li e concordo com os Termos e Condições*</Typography>}
              />
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button variant="contained" onClick={handleSubmit(onSubmit)} color="primary">Registar</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
export default RegisterUserComp;