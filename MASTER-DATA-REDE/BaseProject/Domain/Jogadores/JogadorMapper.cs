using System;
using System.Collections.Generic;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.IntroductionRequests;
using DDDSample1.Domain.Ligacoes;


namespace DDDSample1.Domain.Jogadores
{
    public class JogadorMapper
    {
        public static JogadorDto toDTO(Jogador requestBody)
        {
            List<string> listaTags = new List<string>();
            List<string> introReqStringList = new List<string>();
            List<string> ligStringList = new List<string>();
            string estadoHumor;
            string intensity = "sem_intensidade";


            foreach (Tag tag in requestBody.TagsInteresse)
            {
                listaTags.Add(tag.ToString());

            }

            if (requestBody.IntroductionRequests != null)
            {
                Console.WriteLine("não nulo");
                foreach (IntroductionRequest intro in requestBody.IntroductionRequests)
                {
                    Console.WriteLine("não vazio");
                    introReqStringList.Add(intro.ToString());
                }
            }

            if (requestBody.Ligacoes != null)
            {
                Console.WriteLine("não nulo");
                foreach (Ligacao lig in requestBody.Ligacoes)
                {
                    Console.WriteLine("não vazio");
                    ligStringList.Add(lig.ToString());
                }
            }

            if (requestBody.Mood == null)
            {
                estadoHumor = "sem_estado_de_humor";
            }
            else
            {
                estadoHumor = requestBody.Mood.Value;
                if (requestBody.Mood.Intensity != null)
                {
                    intensity = requestBody.Mood.Intensity;
                }
            }


            return new JogadorDto(requestBody.Id.AsString(),
                requestBody.Nome != null ? requestBody.Nome.ToString() : "sem_nome",
                requestBody.Password,
                requestBody.DataNascimento != null ? requestBody.DataNascimento.ToString() : "sem_data",
                requestBody.NumTelefone != null ? requestBody.NumTelefone.ToString() : "sem_contacto",
                requestBody.Email != null ? requestBody.Email.ToString() : "sem_email",
                requestBody.DescBreve != null ? requestBody.DescBreve.ToString() : "sem_descricao",
                requestBody.Avatar != null ? requestBody.Avatar.ToString() : "sem_avatar",
                listaTags,
                requestBody.PaisResidencia != null ? requestBody.PaisResidencia.ToString() : "sem_pais",
                requestBody.Localidade != null ? requestBody.Localidade.ToString() : "sem_localidade",
                introReqStringList,
                ligStringList,
                estadoHumor,
                intensity);
        }

        public static Jogador toDomain(CreatingJogadorDto dto)
        {
            return new Jogador(dto.Nome, dto.Password, dto.DataNascimento, dto.NumTelefone, dto.Email, dto.DescBreve, dto.Avatar, dto.TagsInteresse, dto.PaisResidencia, dto.Localidade, new List<IntroductionRequest>(), new List<Ligacao>());
        }

        public static EstadoHumorRespostaDto moodDto(string id, string nome, string mood, string intensity)
        {
            return new EstadoHumorRespostaDto(id, nome, mood, intensity);
        }

        public static RedeSocialDto CreateRedeSocialDto(int nivel, Jogador jogador)
        {
            var nome = "sem_nome";
            var mood = "sem_Mood";
            var avatar = "sem_avatar";
            var tags = new List<Tag>();

            if (jogador.Nome != null)
            {
                nome = jogador.Nome.ToString();
            }
            if (jogador.Mood != null)
            {
                if (jogador.Mood.Value != null)
                {
                    mood = jogador.Mood.Value;
                }
            }
            if (jogador.Avatar != null)
            {
                avatar = jogador.Avatar.Value;
            }
            if (jogador.TagsInteresse != null)
            {
                tags.AddRange(jogador.TagsInteresse);
            }

            RedeSocialDto redeSocialDto = new RedeSocialDto(nome, jogador.Id.AsString(), mood, avatar, tags);

            int flag = 0;
            int flag2 = 0;
            if (nivel == 0)
            {
                return redeSocialDto;
            }
            if (nivel == 1)
            {
                foreach (Ligacao lig in jogador.Ligacoes)
                {
                    redeSocialDto.AddLigacaoRedeDto(LigacaoToLigacaoRedeDto(lig));
                }
            }
            if (nivel == 2)
            {
                foreach (Ligacao lig in jogador.Ligacoes)
                {
                    redeSocialDto.AddLigacaoRedeDto(LigacaoToLigacaoRedeDto(lig));
                    foreach (Ligacao lig1 in lig.Jogador1.Ligacoes)
                    {
                        if (!lig1.Jogador1.Id.Equals(lig.Jogador2.Id))
                        {
                            redeSocialDto.LigacoesDto[flag].LigacoesRecursivasDto.Add(LigacaoToLigacaoRedeDto(lig1));
                        }
                    }
                    flag++;
                }
            }


            return redeSocialDto;
        }

        private static LigacaoRedeDto LigacaoToLigacaoRedeDto(Ligacao ligacao)
        {

            var nome = "sem_nome";
            var mood = "sem_Mood";
            var avatar = "sem_avatar";
            var tags = new List<Tag>();

            if (ligacao.Jogador1.Nome != null)
            {
                nome = ligacao.Jogador1.Nome.ToString();
            }
            if (ligacao.Jogador1.Mood != null)
            {
                if (ligacao.Jogador1.Mood.Value != null)
                {
                    mood = ligacao.Jogador1.Mood.Value;
                }
            }
            if (ligacao.Jogador1.Avatar != null)
            {
                avatar = ligacao.Jogador1.Avatar.Value;
            }
            if (ligacao.Jogador1.TagsInteresse != null)
            {
                tags.AddRange(ligacao.Jogador1.TagsInteresse);
            }

            return new LigacaoRedeDto(nome, ligacao.fLigacao.ToString(), mood, ligacao.tagsLigacao.ConvertAll<string>(t => t.ToString()), avatar, tags);
        }

        public static BcJogadoresDto toBcJogadoresDto(Jogador jogador)
        {
            List<string> tagsList = new List<string>();
            foreach (Tag tag in jogador.TagsInteresse)
            {
                tagsList.Add(tag.ToString());

            }
            return new BcJogadoresDto(jogador.Id.AsString(), jogador.Nome, tagsList);
        }

    }
}