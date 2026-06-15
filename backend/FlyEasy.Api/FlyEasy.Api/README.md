FlyEasy Travel Booking System

FlyEasy is a full-stack airline booking system developed as part of the Service Oriented Architecture Final Project at South East European University.

The purpose of the application is to provide a complete airline booking experience for customers and a management platform for administrators. Users can create accounts, log in securely, search for flights, select seats and luggage packages, complete payments, and manage their reservations. Administrators can manage flights, users, bookings, payments, and reports through a dedicated admin dashboard.

Technologies used in this project include React for the frontend, ASP.NET Core .NET 8 Web API for the backend, PostgreSQL as the database management system, Entity Framework Core for data access, JWT for authentication and authorization, BCrypt for password hashing, and xUnit for unit testing.

The system supports two user roles: Customer and Admin.

Customer features include:

Registration
Login
Flight search
Flight booking
Seat selection
Luggage package selection
Payment processing
Viewing personal bookings
Viewing boarding passes
Profile management

Admin features include:

Admin dashboard
Adding flights
Deleting flights
Viewing flights
Viewing bookings
Viewing users
Deleting users
Viewing payments
Viewing reports and statistics

Authentication is implemented using JWT tokens. Passwords are hashed using BCrypt before being stored in the database. Authorization is implemented through role-based access control, allowing only administrators to access protected management functionality.

The database consists of the following main entities:

Users
Flights
Bookings
Seats
Passengers
Payments
Luggage Packages
Airports

The project includes business logic beyond simple CRUD operations. Users can search flights based on departure city, destination city, travel date, and passenger count. During the booking process users select luggage packages and seats, enter passenger information, and complete payment. Seats are automatically generated when administrators create flights. Booked seats cannot be selected by other users. Total booking price is calculated dynamically based on selected services.

The frontend consists of the following pages:

Splash Page
Authentication Page
Home Page
Flights Page
Booking Page
Payment Page
My Bookings Page
Profile Page
Admin Dashboard

Main API endpoints include:

Authentication endpoints for registration and login
Flight endpoints for searching and managing flights
Booking endpoints for creating and viewing reservations
User endpoints for managing users
Payment endpoints for payment processing

Unit testing was implemented using xUnit. The test project contains tests for authentication functionality, flight validation, and booking calculations. All tests pass successfully through Visual Studio Test Explorer.

To run the backend:

Open the solution in Visual Studio.
Configure PostgreSQL.
Verify the connection string in appsettings.json.
Run database migrations.
Start the API project.

Backend URL:
https://localhost:7013

To run the frontend:

Open the frontend folder.
Run npm install.
Run npm run dev.

Frontend URL:
http://localhost:5173

Admin Account:
Email: anesahaliti72@gmail.com
Role: Admin

Future improvements may include Azure deployment, CI/CD pipelines, email notifications, online payment gateway integration, additional reports, and more comprehensive unit testing.

FlyEasy successfully demonstrates Service Oriented Architecture principles, authentication and authorization, business logic implementation, CRUD operations, role-based security, database integration, modern frontend development, and automated testing.

Developed for the Service Oriented Architecture Final Project – South East European University.