using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlyEasy.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddSeatsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsReserved",
                table: "Seats",
                newName: "IsBooked");

            migrationBuilder.AddColumn<string>(
                name: "Class",
                table: "Seats",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Class",
                table: "Seats");

            migrationBuilder.RenameColumn(
                name: "IsBooked",
                table: "Seats",
                newName: "IsReserved");
        }
    }
}
