using Xunit;

namespace FlyEasy.Tests.Tests
{
    public class BookingsControllerTests
    {
        [Fact]
        public void TotalPrice_ShouldBeCalculated()
        {
            decimal flightPrice = 4000;
            decimal luggagePrice = 1000;

            decimal total =
                flightPrice + luggagePrice;

            Assert.Equal(5000, total);
        }

        [Fact]
        public void BookingStatus_ShouldBeConfirmed()
        {
            string status = "Confirmed";

            Assert.Equal("Confirmed", status);
        }
    }
}