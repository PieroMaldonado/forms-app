using System.ComponentModel.DataAnnotations;

namespace forms_api.Models
{
    public class Formulario
    {
        public int id_formulario { get; set; }
        public string nombre_formulario { get; set; }
        public ICollection<Campo> Campos { get; set; }

    }
}
