using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;


namespace DDDSample1.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class JogadoresController : ControllerBase
    {

        private readonly JogadorService _service;

        public JogadoresController(JogadorService service)
        {
            _service = service;
        }

        // GET: api/Jogadores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JogadorDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Jogadores/id do jogador
        [HttpGet("{id}")]
        public async Task<ActionResult<JogadorDto>> GetGetById(Guid id)
        {
            var jogador = await _service.GetByIdAsync(new JogadorId(id));

            if (jogador == null)
            {
                return NotFound();
            }
            return jogador;
        }

        // POST: api/Jogadores
        [HttpPost]
        public async Task<ActionResult<JogadorDto>> Create(CreatingJogadorDto dto)
        {
            try
            {
                var jogador = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = jogador.Id }, jogador);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // PUT: api/Jogadores/5
        [HttpPut("{id}")]
        public async Task<ActionResult<JogadorDto>> Update(Guid id, JogadorDto dto)
        {
            try
            {
                var jog = await _service.UpdateAsync(id, dto);

                if (jog == null)
                {
                    return NotFound();
                }
                return Ok(jog);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // PUT: api/Jogadores/mood/5
        [HttpPut("mood/{id}")]
        public async Task<ActionResult<EstadoHumorRespostaDto>> UpdateMood(string id, EstadoHumorDto dto)
        {
            var jogador = await _service.UpdateMoodAsync(id, dto.Mood, dto.Intensity);

            return jogador;

        }

        // GET: api/Jogadores 
        [HttpGet("sugestion/{id}")]
        public async Task<ActionResult<List<JogadorDto>>> GetSugestionList(Guid id)
        {
            var list = await _service.getSugestionList(new JogadorId(id));

            if (list == null)
            {
                return NotFound();
            }
            return list;
        }


        [HttpGet("rede-social/{nivel}/{id}")]
        public async Task<ActionResult<RedeSocialDto>> buscarRedeSocialPeloJogador(int nivel, Guid id)
        {
            try
            {
                var result = await _service.buscarRedeSocialPeloJogador(nivel, id);
                return Ok(result);
            }
            catch (BusinessRuleValidationException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("amigos-em-comum/{redId}/{objId}")]
        public async Task<ActionResult<RedeSocialDto>> buscarRedeSocialPeloJogador(Guid redId, Guid objId)
        {
            try
            {
                var result = await _service.GetAmigosEmComum(redId, objId);
                return Ok(result);
            }
            catch (BusinessRuleValidationException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("procurarjogador/nome/{nome}")]
        public async Task<ActionResult<JogadorDto>> procurarPorNome(string nome)
        {
            var jogador = await _service.searchPlayerByName(nome);
            if (jogador == null)
            {
                return NotFound();
            }
            return jogador;
        }

        [HttpGet("bc-jogadores")]
        public async Task<ActionResult<List<BcJogadoresDto>>> getBcJogadores()
        {
            return await this._service.getBcJogadores();
        }

        [HttpGet("fortaleza/{id}")]
        public async Task<ActionResult<FortalezaDto>> getFortalezaJogador(Guid id)
        {
            return await this._service.getFortalezaJogador(id);

        }

        [HttpGet("tamanho/{id}")]
        public async Task<ActionResult<TamanhoRedeDto>> getNetworkSize(Guid id)
        {
            return await this._service.getNetworkSize(id);
        }

        [HttpGet("leader-board/fortaleza/")]
        public async Task<ActionResult<List<FortalezaDto>>> getFortalezaLeaderBoard()
        {
            return await this._service.getFortalezaLeaderBoard();

        }

        [HttpGet("leader-board/tamanho/")]
        public async Task<ActionResult<List<TamanhoRedeDto>>> getSizeLeaderboard()
        {
            return await this._service.getSizeLeaderboard();
        }

        [HttpGet("tamanho-rede-geral")]
        public async Task<ActionResult<TamanhoRedeTotalDto>> getTamanhoRedeTotal()
        {
            return await this._service.GetTamanhoRedeTotal();
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<JogadorDto>> HardDelete(Guid id)
        {
            try
            {
                var jog = await _service.DeleteAsync(new JogadorId(id));

                if (jog == null)
                {
                    return NotFound();
                }

                return Ok(jog);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("my-tags-tagcloud/{id}")]
        public async Task<ActionResult<List<TagsTagCloudDto>>> getMyTagsTagCloud(Guid id)
        {
            return await this._service.getMyTagsTagCloud(id);
        }

        [HttpGet("pesquisar/email/{email}")]
        public async Task<ActionResult<JogadorDto>> getJogadorByEmail(string email)
        {
            try
            {
                return await this._service.getJogadorByEmail(email);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }catch(ArgumentException ex){
                return NotFound(new { Message = ex.Message });

            }
        }
    }
}