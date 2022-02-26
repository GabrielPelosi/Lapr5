using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Ligacoes;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Jogadores;


namespace DDDSample1.Controllers{

    [Route("api/[controller]")]
    [ApiController]
    public class LigacoesController : ControllerBase{

        private readonly ILigacaoService _service;

        public LigacoesController(ILigacaoService service){
            _service = service;
        }

         // GET: api/Ligacoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LigacaoDto>>> GetAll(){
            return await _service.GetAllAsync();
        }


        // PUT: api/Ligacao/5
        [HttpPut("forcatags/{id}")]
        public async Task<ActionResult<LigacaoDto>> UpdateTagsForca(Guid id, LigacaoDto dto){
            try{
                var ligacao = await _service.updateTagsForca(id, dto);

                if(ligacao==null){
                    return NotFound();
                }
                return Ok(ligacao);

            }catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
        
        [HttpGet("user/{id}")]
        public async Task<ActionResult<IEnumerable<LigacaoDto>>> getAllUserConnections(Guid id)
        {
            try
            {
                return await _service.getAllUserConnections(id);
            }
            catch (BusinessRuleValidationException ex)
            {
                return NotFound(ex.Message);
            }
        }
        

    }
}