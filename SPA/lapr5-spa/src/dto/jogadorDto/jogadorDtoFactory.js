export const toJogadorDto = (id, nome, password, dataNascimento, numTelefone, email, descBreve, avatar, tagsInteresse, paisResidencia, localidade, introRequests, ligacoes, mood, intensity) => {
  return {
    idJog: id,
    nomeJog: nome,
    passwordJog: password,
    dnJog: dataNascimento,
    telefoneJog: numTelefone,
    emailJog: email,
    descBreveJog: descBreve,
    avatarJog: avatar,
    tagsJog: tagsInteresse,
    paisJog: paisResidencia,
    cidadeJog: localidade,
    introReqJog: introRequests,
    ligacoesJog: ligacoes,
    moodJogador: mood,
    intensityJog: intensity
  };
};