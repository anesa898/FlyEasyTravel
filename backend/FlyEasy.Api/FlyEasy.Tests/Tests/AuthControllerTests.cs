using Xunit;

namespace FlyEasy.Tests.Tests
{
    public class AuthControllerTests
    {
        [Fact]
        public void PasswordHash_ShouldNotBeNull()
        {
            string password = "Test123";

            string hash =
                BCrypt.Net.BCrypt.HashPassword(password);

            Assert.NotNull(hash);
        }

        [Fact]
        public void PasswordVerification_ShouldReturnTrue()
        {
            string password = "Test123";

            string hash =
                BCrypt.Net.BCrypt.HashPassword(password);

            bool result =
                BCrypt.Net.BCrypt.Verify(password, hash);

            Assert.True(result);
        }
    }
}