using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;
using DDDSample1.Domain.Ligacoes;

namespace DDDSample1.Domain.Jogadores
{
    public class JogadorService : IJogadorService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJogadorRepository _repo;

        public JogadorService(IUnitOfWork unitOfWork, IJogadorRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<JogadorDto> AddAsync(CreatingJogadorDto dto)
        {
            var jogador = JogadorMapper.toDomain(dto);

            await this._repo.AddAsync(jogador);
            await this._unitOfWork.CommitAsync();

            return JogadorMapper.toDTO(jogador);
        }

        public async Task<JogadorDto> UpdateAsync(Guid id, JogadorDto dto)
        {
            var j = await this._repo.GetByIdAsync(new JogadorId(id));

            if (j == null)
                return null;

            // change all editable player fields
            j.ChangeName(dto.Nome);
            j.ChangeDateOfBirth(dto.DataNascimento);
            j.ChangeEmail(dto.Email);
            j.ChangePhoneNumber(dto.NumTelefone);
            j.ChangeDescription(dto.DescBreve);
            j.ChangeTags(dto.TagsInteresse);
            j.ChangeCountry(dto.PaisResidencia);
            j.ChangeCity(dto.Localidade);
            j.ChangeAvatar(dto.Avatar);

            await this._unitOfWork.CommitAsync();

            return JogadorMapper.toDTO(j);
        }

        public async Task<JogadorDto> GetByIdAsync(JogadorId id)
        {

            var jogador = await this._repo.GetByIdAsync(id);

            if (jogador == null)
            {
                return null;
            }

            return JogadorMapper.toDTO(jogador);
        }

        public async Task<List<JogadorDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            foreach (Jogador j in list)
            {
                Console.WriteLine("=> " + j.ToString());
            }
            List<JogadorDto> listDto = list.ConvertAll<JogadorDto>(jogador => JogadorMapper.toDTO(jogador));

            return listDto;
        }
        public async Task<EstadoHumorRespostaDto> UpdateMoodAsync(string id, string mood, string intensity)
        {
            var j = await this._repo.GetByIdAsync(new JogadorId(id));

            if (j == null)
                return null;

            j.ChangeMood(mood, intensity);

            await this._unitOfWork.CommitAsync();

            return JogadorMapper.moodDto(j.Id.AsString(), j.Nome.ToString(), j.Mood.Value, j.Mood.Intensity.ToString());
        }


        public async Task<List<JogadorDto>> getSugestionList(JogadorId id)
        {
            var user = await _repo.GetByIdAsync(id);

            var list = await _repo.GetListSugestaoJogadores(user);

            List<JogadorDto> dtos = list.ConvertAll<JogadorDto>(intro => JogadorMapper.toDTO(intro));
            return dtos;
        }

        public async Task<RedeSocialDto> buscarRedeSocialPeloJogador(int nivel, Guid id)
        {
            if (nivel < 0) return null;

            var jogador = await this._repo.GetByIdAsync(new JogadorId(id));
            if (jogador == null) return null;

            return JogadorMapper.CreateRedeSocialDto(nivel, jogador);
        }

        public async Task<List<JogadorDto>> GetAmigosEmComum(Guid requestingUserId, Guid objectiveUserId)
        {
            var reqUser = await _repo.GetByIdAsync(new JogadorId(requestingUserId));
            Console.WriteLine(reqUser.Nome.ToString());
            var objUser = await _repo.GetByIdAsync(new JogadorId(objectiveUserId));
            Console.WriteLine(objUser.Nome.ToString());
            var jogadores = await _repo.GetAmigosEmComum(reqUser, objUser);

            return jogadores.ConvertAll<JogadorDto>(jog => JogadorMapper.toDTO(jog));
        }

        public async Task<JogadorDto> searchPlayerByName(string nome)
        {
            var jog = await _repo.SearchPlayerByName(nome);
            if (jog == null)
            {
                return null;
            }

            return JogadorMapper.toDTO(jog);
        }

        public async Task<List<BcJogadoresDto>> getBcJogadores()
        {
            var listJogadores = await _repo.GetAllAsync();
            return listJogadores.ConvertAll<BcJogadoresDto>(jog => JogadorMapper.toBcJogadoresDto(jog));
        }

        public async Task<FortalezaDto> getFortalezaJogador(Guid id)
        {
            var jogador = await _repo.GetByIdAsync(new JogadorId(id));
            if (jogador == null)
            {
                throw new ArgumentException("Jogador não encontrado!");
            }
            var total = 0;
            foreach (Ligacao lig in jogador.Ligacoes)
            {
                total = total + Int32.Parse(lig.fLigacao.Value);
            }

            return new FortalezaDto(total, jogador.Nome);

        }

        public async Task<TamanhoRedeDto> getNetworkSize(Guid id)
        {
            var jog = await this._repo.GetByIdAsync(new JogadorId(id));
            if (jog == null) throw new ArgumentException("Jogador não encontrado!");
            var size = 0;

            foreach (Ligacao lig in jog.Ligacoes)
            {
                size++;
                foreach (Ligacao lig1 in lig.Jogador1.Ligacoes)
                {
                    if (!lig1.Jogador1.Id.Equals(lig.Jogador2.Id))
                    {
                        size++;
                    }
                }
            }
            return new TamanhoRedeDto(size, jog.Nome);
        }

        public async Task<List<FortalezaDto>> getFortalezaLeaderBoard()
        {
            var jogadores = await _repo.GetAllAsync();
            var leaderboard = new List<FortalezaDto>();
            foreach (Jogador jog in jogadores)
            {
                var total = 0;
                foreach (Ligacao lig in jog.Ligacoes)
                {
                    total = total + Int32.Parse(lig.fLigacao.Value);
                }

                leaderboard.Add(new FortalezaDto(total, jog.Nome));

            }

            leaderboard.Sort(delegate (FortalezaDto x, FortalezaDto y)
            {
                return y.ValorFortaleza.CompareTo(x.ValorFortaleza);
            }); ;
            return leaderboard;

        }

        public async Task<List<TamanhoRedeDto>> getSizeLeaderboard()
        {
            var jogadores = await _repo.GetAllAsync();
            var leaderboard = new List<TamanhoRedeDto>();

            foreach (Jogador j in jogadores)
            {
                var size = 0;
                foreach (Ligacao lig in j.Ligacoes)
                {
                    size++;
                    foreach (Ligacao lig1 in lig.Jogador1.Ligacoes)
                    {
                        if (!lig1.Jogador1.Id.Equals(lig.Jogador2.Id))
                        {
                            size++;
                        }
                    }
                }
                leaderboard.Add(new TamanhoRedeDto(size, j.Nome));
            }

            leaderboard.Sort(delegate (TamanhoRedeDto x, TamanhoRedeDto y)
            {
                return y.Tamanho.CompareTo(x.Tamanho);
            }); ;
            return leaderboard;

        }

        public async Task<TamanhoRedeTotalDto> GetTamanhoRedeTotal()
        {
            var jogadores = await _repo.GetAllAsync();
            return new TamanhoRedeTotalDto(jogadores.Count);
        }

        public async Task<JogadorDto> DeleteAsync(JogadorId id)
        {
            var jog = await this._repo.GetByIdAsync(id);

            if (jog == null) return null;

            this._repo.Remove(jog);
            await this._unitOfWork.CommitAsync();

            return JogadorMapper.toDTO(jog);
        }

        public async Task<List<TagsTagCloudDto>> getMyTagsTagCloud(Guid id)
        {
            var jogadores = await _repo.GetAllAsync();
            var jog = await this._repo.GetByIdAsync(new JogadorId(id));
            if (jog == null) throw new ArgumentException("Jogador não encontrado!");

            var tagCloud = new List<TagsTagCloudDto>();
            var tagsAllUsers = new List<Tag>();
            var counter = 0;

            foreach (Jogador j in jogadores)
            {
                foreach (Tag t in j.TagsInteresse)
                {
                    tagsAllUsers.Add(t);
                }
            }

            foreach (Tag tag in jog.TagsInteresse)
            {
                counter = 0;
                foreach (Tag t in tagsAllUsers)
                {
                    if (t.Equals(tag))
                    {
                        counter++;
                    }
                }
                tagCloud.Add(new TagsTagCloudDto(tag.ToString(), counter));
            }

            return tagCloud;
        }

        public async Task<JogadorDto> getJogadorByEmail(string email){
            var jogs = await this._repo.GetAllAsync();
            foreach(Jogador j in jogs){
                if(j.Email.ToString() == email){
                    return JogadorMapper.toDTO(j);
                }
            }
            throw new ArgumentException("Jogador não encontrado!");
        }
    }
}