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
    public class FormularioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FormularioController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get() 
        {
            try
            {
                var formularios = await _context.Formularios
                .Include(f => f.Campos) 
                .ToListAsync();
                if (formularios.Count == 0)
                {
                    return NotFound("No hay formularios en la DB");
                }
                return Ok(formularios);
            }
            catch (Exception ex)
            {
                var errorResponse = new
                {
                    Message = "Ocurrió un error al obtener los formularios.",
                    Error = ex.Message
                };
                return BadRequest(errorResponse);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFormularioById(int id)
        {
            try
            {
                var formulario = await _context.Formularios
                    .Include(f => f.Campos)
                    .FirstOrDefaultAsync(f => f.id_formulario == id);

                if (formulario == null)
                {
                    return NotFound($"No se encontró el formulario con ID {id}.");
                }

                return Ok(formulario);
            }
            catch (Exception ex)
            {
                var errorResponse = new
                {
                    Message = "Ocurrió un error al obtener el formulario.",
                    Error = ex.Message
                };
                return BadRequest(errorResponse);
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] FormularioDTO formularioDto)
        {
            if (formularioDto == null || string.IsNullOrWhiteSpace(formularioDto.nombre_formulario))
            {
                return BadRequest("El nombre del formulario es obligatorio.");
            }

            var formulario = new Formulario
            {
                nombre_formulario = formularioDto.nombre_formulario
            };

            _context.Formularios.Add(formulario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = formulario.id_formulario }, formulario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] FormularioDTO formularioDto)
        {
            if (formularioDto == null || string.IsNullOrWhiteSpace(formularioDto.nombre_formulario))
            {
                return BadRequest("El nombre del formulario es obligatorio.");
            }

            var formulario = await _context.Formularios.FindAsync(id);
            if (formulario == null)
            {
                return NotFound($"Formulario con ID {id} no encontrado.");
            }

            formulario.nombre_formulario = formularioDto.nombre_formulario;
            _context.Formularios.Update(formulario);
            await _context.SaveChangesAsync();
            return Ok(formulario);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var formulario = await _context.Formularios.FindAsync(id);
            if (formulario == null)
            {
                return NotFound($"Formulario con ID {id} no encontrado.");
            }

            _context.Formularios.Remove(formulario);
            await _context.SaveChangesAsync();

            return NoContent(); 
        }
    }
}
