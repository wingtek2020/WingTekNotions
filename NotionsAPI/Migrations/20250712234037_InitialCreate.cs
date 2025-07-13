using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CNotionAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NeedleSizes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Metric = table.Column<double>(type: "float", nullable: false),
                    Us = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsHook = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NeedleSizes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Location = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    AboutMe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AboutMeHtml = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfileCountryCode = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: true),
                    TinyPhotoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SmallPhotoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhotoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LargePhotoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FaveCurse = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    FaveColors = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Birthday = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NeedleTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MetricName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypeName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Length = table.Column<double>(type: "float", nullable: false),
                    NeedleSizeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NeedleTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NeedleTypes_NeedleSizes_NeedleSizeId",
                        column: x => x.NeedleSizeId,
                        principalTable: "NeedleSizes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Needles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Size = table.Column<double>(type: "float", nullable: false),
                    UsSize = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MetricSize = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Length = table.Column<double>(type: "float", nullable: true),
                    Material = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Needles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Needles_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Patterns",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PublishedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Gauge = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    RowGauge = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Yardage = table.Column<int>(type: "int", nullable: true),
                    YarnWeightDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RatingAverage = table.Column<double>(type: "float", nullable: true),
                    RatingCount = table.Column<int>(type: "int", nullable: true),
                    DifficultyAverage = table.Column<double>(type: "float", nullable: true),
                    DifficultyCount = table.Column<int>(type: "int", nullable: true),
                    Free = table.Column<bool>(type: "bit", nullable: false),
                    Downloadable = table.Column<bool>(type: "bit", nullable: false),
                    PdfUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuthorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patterns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Patterns_User_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PatternNeedleSize",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PatternId = table.Column<int>(type: "int", nullable: false),
                    SizeMetric = table.Column<double>(type: "float", nullable: false),
                    UsSize = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatternNeedleSize", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PatternNeedleSize_Patterns_PatternId",
                        column: x => x.PatternId,
                        principalTable: "Patterns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Needles_UserId",
                table: "Needles",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_NeedleTypes_NeedleSizeId",
                table: "NeedleTypes",
                column: "NeedleSizeId");

            migrationBuilder.CreateIndex(
                name: "IX_PatternNeedleSize_PatternId",
                table: "PatternNeedleSize",
                column: "PatternId");

            migrationBuilder.CreateIndex(
                name: "IX_Patterns_AuthorId",
                table: "Patterns",
                column: "AuthorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Needles");

            migrationBuilder.DropTable(
                name: "NeedleTypes");

            migrationBuilder.DropTable(
                name: "PatternNeedleSize");

            migrationBuilder.DropTable(
                name: "NeedleSizes");

            migrationBuilder.DropTable(
                name: "Patterns");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
