namespace forms_api.Models
{
    public class Campo
    {
        public int id_campo { get; set; }
        public string tipo_campo { get; set; } = "string";
        public string nombre_campo { get; set; }
        public int id_formulario { get; set; }

    }
}
