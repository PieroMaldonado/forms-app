namespace forms_api.DTOs
{
    public class CampoDTO
    {
        public int id_formulario { get; set; }
        public string tipo_campo { get; set; } = "string";
        public string nombre_campo { get; set; }
    }
}
