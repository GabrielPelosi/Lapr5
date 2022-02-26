import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { pesquisarPeloEmail } from "../../Service/PesquisarJogadorPeloEmailService";

export const LoginJogador = () => {

  const [emailText, setEmailText] = useState("");
  const [user, setUser] = useState({});

  const onTextChange = (e) => setEmailText(e.target.value);

  const handleSubmit = () => {
    pesquisarPeloEmail(setUser, emailText);
  };

  return (
    <div>
      <h2>Login</h2>
      <h4>Id atual: {user.id}</h4>
      <h4>Nome atual: {user.nome}</h4>

      <TextField
        onChange={onTextChange}
        value={emailText}
        label={"email"} //optional
      />
      <Box m={3}>
        <button onClick={handleSubmit}>Submit</button>
      </Box>
    </div>
  );
};

export default LoginJogador;
