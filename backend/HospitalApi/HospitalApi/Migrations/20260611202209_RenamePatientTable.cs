using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalApi_.Migrations
{
    /// <inheritdoc />
    public partial class RenamePatientTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Patients",
                table: "Patients");

            migrationBuilder.RenameTable(
                name: "Patients",
                newName: "Pa");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Pa",
                table: "Pa",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Pa",
                table: "Pa");

            migrationBuilder.RenameTable(
                name: "Pa",
                newName: "Patients");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Patients",
                table: "Patients",
                column: "Id");
        }
    }
}
