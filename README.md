Overview

This project is a microservices-based e-commerce platform built with NestJS. It consists of multiple microservices, each with its own database, and an API Gateway for routing requests. The platform uses Eureka for service discovery and MongoDB for data storage.

Prerequisites

Ensure you have the following installed on your machine:

Node.js (>= 16.x)

Docker

Docker Compose

Git

Microservices Structure

API Gateway (Port: 3000): Routes requests to different services.

User Service (Port: 3001): Manages user authentication and profiles.

Product Service (Port: 3002): Handles product catalog.

Order Service (Port: 3003): Manages orders and queries product details.

Eureka Server (Port: 8761): Service registry for microservices discovery.

MongoDB (Port: 27017): Database used by all microservices.

Setup and Running the Project

1. Clone the Repository

git clone <repository-url>
cd <project-directory>



2. Start the Services with Docker Compose

Run the following command in the root directory:

docker-compose up --build

This will build and start all microservices along with MongoDB and Eureka Server.

3. Verify Running Containers

Check if all services are running correctly:

docker ps

4. Access the Services

Eureka Dashboard: http://localhost:8761

API Gateway: http://localhost:3000

User Service: http://localhost:3001

Product Service: http://localhost:3002

Order Service: http://localhost:3003

5. Stopping the Services

To stop all running containers:

docker-compose down


API Endpoints

User Service (http://localhost:3001)

POST /auth/register: Register a new user

POST /auth/login: User login

GET /users/profile: Get user profile

Product Service (http://localhost:3002)

POST /products: Add a product

GET /products: List all products

GET /products/:id: Get product details

PUT /products/:id: Update product

DELETE /products/:id: Delete product

Order Service (http://localhost:3003)

POST /orders: Create an order

GET /orders: List all orders

GET /orders/:id: Get order details (fetches product info dynamically)
