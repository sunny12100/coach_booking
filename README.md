# Coach Booking Application

A Node.js-based Coach booking system that allows users to reserve train seats. The application supports features such as row-wise seat booking and prioritization of nearby rows when the requested seats cannot be accommodated in a single row.

Live Link: https://coach-booking-frontend.onrender.com/

## Features

- **Row-wise Seat Reservation**: Seats are reserved starting from the same row whenever possible.
- **Nearby Row Allocation**: If enough seats are not available in a single row, the system allocates nearby rows.
- **API Endpoints**: Various endpoints for managing seat reservations.
- **Secure Database Connection**: Uses PostgreSQL hosted on Render with SSL.

## Technologies Used

- **Frontend**: Reactjs
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (hosted on Render)
- **Authentication**: JWT (JSON Web Tokens)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database

### Steps

1. **Clone the repository**:

    ```bash
    git clone https://github.com/sunny12100/coach_booking.git
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Create a `.env` file in the root directory** with the following variables:

    ```plaintext
    DB_USER=your_database_user
    DB_HOST=your_database_host
    DB_NAME=your_database_name
    DB_PASSWORD=your_database_password
    DB_PORT=5432
    JWT_SECRET=your_jwt_secret
    ```

4. **Set up the database**:

    - Create a PostgreSQL database.
    - Add the necessary tables using the provided SQL schema (if available).

5. **Start the server**:

    ```bash
    npm start
    ```

    The server will be running on `http://localhost:3000`.

## API Endpoints

### Fetch Seats

**Get** `/seats`

Description: Fetches The seats from the database.

### Seat Reservation

**POST** `/seats/reserve`

Description: Reserves a specified number of seats for a user(Less than 7).

#### Request Body:

```json
{
  "seatCount": 5
}
```
#### Response :
```json
{
  "message": "Seats reserved successfully.",
  "reservedSeats": [1, 2, 3, 4, 5]
}
```
## Reset Seats

**POST** `/seats/reset`

Description: Resets The seats from the database.


---

#### User Signup

**POST** `/auth/signup`

This endpoint is used to register a new user by providing their username, email, and password. Upon successful registration, the user will receive a success message.

#### Request

- **Method**: `POST`
- **URL**: `/auth/signup`
- **Request Body**:

```json
{
  "username": "user1",
  "email": "user1@example.com",
  "password": "password123"
}
```
#### User Login

**POST** `/auth/login`

This endpoint is used to verify a existing user.

#### Request

- **Method**: `POST`
- **URL**: `/auth/login`
- **Request Body**:

```json
{
  "email": "user1@example.com",
  "password": "password123"
}


