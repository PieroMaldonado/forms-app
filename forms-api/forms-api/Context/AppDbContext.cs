using forms_api.Models;
using Microsoft.EntityFrameworkCore;

namespace forms_api.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Formulario> Formularios { get; set; }
        public DbSet<Campo> Campos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Formulario>().HasKey(f => f.id_formulario);
            modelBuilder.Entity<Campo>().HasKey(c => c.id_campo);
            modelBuilder.Entity<Campo>()
                .HasOne<Formulario>()
                .WithMany(f => f.Campos)
                .HasForeignKey(c => c.id_formulario)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
