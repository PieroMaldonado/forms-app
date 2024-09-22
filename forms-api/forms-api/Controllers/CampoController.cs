using forms_api.Context;
using forms_api.DTOs;
using forms_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace forms_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CampoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var campos = await _context.Campos.ToListAsync();
                if (campos.Count == 0)
                {
                    return NotFound("No hay campos en la DB.");
                }
                return Ok(campos);
            }
            catch (Exception ex)
            {
                var errorResponse = new
                {
                    Message = "Ocurrió un error al obtener los campos.",
                    Error = ex.Message
                };
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{formulario_id}")]
        public async Task<IActionResult> GetByFormularioId(int formulario_id)
        {
            try
            {
                var campos = await _context.Campos
                    .Where(c => c.id_formulario == formulario_id)
                    .ToListAsync();

                if (campos.Count == 0)
                {
                    return NotFound($"No hay campos para el formulario con ID {formulario_id}.");
                }
                return Ok(campos);
            }
            catch (Exception ex)
            {
                var errorResponse = new
                {
                    Message = "Ocurrió un error al obtener los campos del formulario.",
                    Error = ex.Message
                };
                return BadRequest(errorResponse);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CampoDTO campoDto)
        {
            if (campoDto == null || string.IsNullOrWhiteSpace(campoDto.nombre_campo))
            {
                return BadRequest("El campo no puede estar vacío.");
            }

            var formulario = await _context.Formularios.FindAsync(campoDto.id_formulario);

            if (formulario == null)
            {
                return NotFound($"No se encontró el formulario con ID {campoDto.id_formulario}.");
            }

            var campo = new Campo
            {
                id_formulario = campoDto.id_formulario,
                tipo_campo = campoDto.tipo_campo,
                nombre_campo = campoDto.nombre_campo,
            };

            try
            {
                _context.Campos.Add(campo);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(Get), new { id = campo.id_campo }, campo);
            }
            catch (Exception ex)
            {
                var errorResponse = new
                {
                    Message = "Ocurrió un error al crear el campo.",
                    Error = ex.Message
                };
                return BadRequest(errorResponse);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CampoUpdateDTO campoUpdateDto)
        {
            if (campoUpdateDto == null || string.IsNullOrWhiteSpace(campoUpdateDto.nombre_campo))
            {
                return BadRequest("El campo no puede estar vacío.");
            }

            var campo = await _context.Campos.FindAsync(id);

            if (campo == null)
            {
                return NotFound($"No se encontró el campo con ID {id}.");
            }

            campo.tipo_campo = campoUpdateDto.tipo_campo;
            campo.nombre_campo = campoUpdateDto.nombre_campo;

            try
            {
                await _context.SaveChangesAsync();
                return Ok (campo);
            }
            catch (Exception ex)
            {
                var errorResponse = new
                {
                    Message = "Ocurrió un error al actualizar el campo.",
                    Error = ex.Message
                };
                return BadRequest(errorResponse);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var campo = await _context.Campos.FindAsync(id);

            if (campo == null)
            {
                return NotFound($"No se encontró el campo con ID {id}.");
            }

            try
            {
                _context.Campos.Remove(campo);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                var errorResponse = new
                {
                    Message = "Ocurrió un error al eliminar el campo.",
                    Error = ex.Message
                };
                return BadRequest(errorResponse);
            }
        }


    }
}
