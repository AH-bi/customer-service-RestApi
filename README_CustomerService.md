
# Customer Service REST API

This is a Node.js project for managing customers, companies, and orders. It uses **Express.js** as a web framework and **MongoDB** as a database. The project provides an API to perform CRUD (Create, Read, Update, Delete) operations for customers, companies, and orders, as well as features for authentication and authorization.

## Features

- **Customer Management**: Create, read, update, and delete customers.
- **Company Management**: Create, read, update, and delete companies.
- **Order Management**: Create, read, update, and delete orders.
- **Authentication & Authorization**: Protect routes to ensure only authorized users can access certain resources.

## Requirements

Make sure you have the following installed:

- **Node.js** (version 12 or higher)
- **MongoDB** (running locally or a remote instance)

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/AH-bi/customer-service-RestApi.git
cd customer-service-RestApi
```

### 2. Install the dependencies:
```bash
npm install
```

### 3. Set up environment variables:

Create a `.env` file in the root directory with the following values:

```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```

### 4. Start the application:

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

## API Endpoints

The API supports the following endpoints:

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create a new customer
- `PUT /api/customers/:id` - Update a customer
- `DELETE /api/customers/:id` - Delete a customer
- `GET /api/companies` - Get all companies
- `POST /api/companies` - Create a new company
- `PUT /api/companies/:id` - Update a company
- `DELETE /api/companies/:id` - Delete a company
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id` - Update an order
- `DELETE /api/orders/:id` - Delete an order

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
