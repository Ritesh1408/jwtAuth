
# JWT Authentication System with Node.js

## Project Overview

This project consists of two primary components:
- **Main Service**: Handles user authentication and authorization using JWT (JSON Web Tokens), and provides endpoints for adding and retrieving candidates.
- **Public API Microservice**: Offers endpoints authorized using an API key, rather than traditional user credentials. It includes endpoints to retrieve user profiles and candidates based on the API key.

## Project Structure

- **Main Service**
  - Handles user registration, login, and authentication.
  - Provides JWT tokens upon successful login.
  - Contains endpoints to add and retrieve candidates from the database.

- **Public API Microservice**
  - Provides endpoints authorized with an API key instead of JWT.
  - Includes endpoints to retrieve user profiles and candidates associated with the API key.

## Setting Up and Running the Services

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)
- MongoDB (for database setup)

### Main Service

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd main-service
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
PORT=3000
JWT_SECRET=<your_jwt_secret_key>
MONGO_URI=<your_mongodb_connection_string>
```

#### 4. Start the Main Service

```bash
npm start
```

The Main Service will be available at `http://localhost:3000`.

### Public API Microservice

#### 1. Navigate to the Microservice Directory

```bash
cd ../public-api-microservice
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
PORT=3001
MONGO_URI=<your_mongodb_connection_string>
```

#### 4. Start the Public API Microservice

```bash
npm start
```

The Public API Microservice will be available at `http://localhost:3001`.

## Testing the Endpoints

### 1. Register a New User

**Endpoint:** `POST /api/register`  
**URL:** `http://localhost:3000/api/register`

**Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### 2. Log in to Get JWT Token

**Endpoint:** `POST /api/login`  
**URL:** `http://localhost:3000/api/login`

**Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "<jwt_token>"
}
```

### 3. Access Protected Endpoint

**Endpoint:** `POST /api/protected`  
**URL:** `http://localhost:3000/api/protected`

**Headers:**
```json
{
  "Authorization": "Bearer <jwt_token>"
}
```

### 4. Add a Candidate

**Endpoint:** `POST /api/candidate`  
**URL:** `http://localhost:3000/api/candidate`

**Headers:**
```json
{
  "Authorization": "Bearer <jwt_token>"
}
```

**Body:**
```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane.smith@example.com"
}
```

### 5. Retrieve Candidates

**Endpoint:** `GET /api/candidate`  
**URL:** `http://localhost:3000/api/candidate`

**Headers:**
```json
{
  "Authorization": "Bearer <jwt_token>"
}
```

### 6. Retrieve Profile via Public API

**Endpoint:** `POST /api/public/profile`  
**URL:** `http://localhost:3001/api/public/profile`

**Headers:**
```json
{
  "x-api-key": "<api_key>"
}
```

### 7. Retrieve Candidates via Public API

**Endpoint:** `GET /api/public/candidate`  
**URL:** `http://localhost:3001/api/public/candidate`

**Headers:**
```json
{
  "x-api-key": "<api_key>"
}
```

## Final Notes

- Ensure MongoDB is running before starting the services.
- Replace `<repository-url>`, `<your_jwt_secret_key>`, `<your_mongodb_connection_string>`, `<jwt_token>`, and `<api_key>` with your actual values.
- The project should run smoothly if all dependencies are installed as mentioned.

If any issues arise, verify that all dependencies are installed and environment variables are correctly set.

