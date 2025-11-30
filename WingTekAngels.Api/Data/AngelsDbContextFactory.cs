using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace WingTekAngels.Api.Data
{
    public class AngelsDbContextFactory : IDesignTimeDbContextFactory<AngelsDbContext>
    {
        public AngelsDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AngelsDbContext>();

            var conn = "Server=Chris\\WINGTEK2026;Database=Angels;User Id=sa;Password=!Qwerasdfzxcv1!;TrustServerCertificate=True;";
            optionsBuilder.UseSqlServer(conn);

            return new AngelsDbContext(optionsBuilder.Options);
        }
    }
}
