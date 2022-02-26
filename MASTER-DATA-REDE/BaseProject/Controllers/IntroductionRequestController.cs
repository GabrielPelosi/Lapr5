using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.IntroductionRequests;


namespace DDDSample1.Controllers
{



    [Route("/api/[controller]")]
    [ApiController]
    public class IntroductionRequestController : ControllerBase
    {

        private readonly IIntroductionRequestService _service;

        public IntroductionRequestController(IIntroductionRequestService _service)
        {
            this._service = _service;
        }

        [HttpGet("pending/{id}")]
        public async Task<ActionResult<IEnumerable<IntroductionRequestDto>>> getAllPendingIntroductionRequests(Guid id)
        {
            try
            {
                return await _service.getAllPendingIntroductionRequestsFromUser(id);
            }
            catch (BusinessRuleValidationException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("approved/{id}")]
        public async Task<ActionResult<IEnumerable<IntroductionRequestDto>>> getAprovedIntroRequestsPendingToBeAccepted(Guid id)
        {
            try
            {
                return await _service.getAllApprovedIntroductionRequestsFromUserPendingToBeAccepted(id);
            }
            catch (BusinessRuleValidationException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<IntroductionRequestDto>> createNewIntroductionRequest(CreatingIntroductionRequestDto createIntroductionRequestDto)
        {
            try
            {
                var intro = await _service.addAsync(createIntroductionRequestDto);
                return Ok(intro);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });

            }
            catch (FormatException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }

        }
        
        [HttpPost("sistema-introdutor/")]
        public async Task<ActionResult<IntroductionRequestDto>> novoPedidoIntroducaoSystemaComoBridgeUser(CreatingIntroductionRequestDto createIntroductionRequestDto)
        {
            try
            {
                var intro = await _service.criarPedidoQueSeraAprovadoPeloSistema(createIntroductionRequestDto);
                return Ok(intro);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });

            }
            catch (FormatException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }

        }

        [HttpPost("aprovado/")]
        public async Task<ActionResult<IntroductionRequestDto>> novoPedidoDeIntroducaoAprovadoPeloSistema(CreatingIntroductionRequestAprovedDto createIntroductionRequestDto)
        {
            try
            {
                var intro = await _service.criarPedidoAprovadoPeloSistema(createIntroductionRequestDto);
                return Ok(intro);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });

            }
            catch (FormatException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }

        }


        // PUT: api/IntroductionRequest
        [HttpPut("updatestatus/{id}")]
        public async Task<ActionResult<IntroductionRequestDto>> Update(Guid id, IntroductionRequestBooleanDto booleanDto)
        {
            try
            {
                var introReq = await _service.UpdateStatusAsync(id, booleanDto);

                if (introReq == null)
                {
                    return NotFound();
                }
                return Ok(introReq);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // PUT: api/IntroductionRequest
        [HttpPut("updatestatusar/{id}")]
        public async Task<ActionResult<IntroductionRequestDto>> UpdateStatusAcceptReject(Guid id, IntroductionRequestBooleanDto booleanDto)
        {
            try
            {
                var introReq = await _service.UpdateStatusARAsync(id, booleanDto);

                if (introReq == null)
                {
                    return NotFound();
                }
                return Ok(introReq);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

    }
}