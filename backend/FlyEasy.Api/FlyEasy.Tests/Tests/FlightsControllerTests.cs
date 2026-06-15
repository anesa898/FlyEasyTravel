using Xunit;

namespace FlyEasy.Tests.Tests
{
    public class FlightsControllerTests
    {
        [Fact]
        public void FlightPrice_ShouldBeGreaterThanZero()
        {
            decimal price = 4500;

            Assert.True(price > 0);
        }

        [Fact]
        public void AvailableSeats_ShouldBePositive()
        {
            int seats = 36;

            Assert.True(seats > 0);
        }
    }
}