CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE seats (
    id SERIAL PRIMARY KEY,
    row_number INT NOT NULL,
    seat_number INT NOT NULL,
    is_reserved BOOLEAN DEFAULT FALSE,
    reserved_by INT REFERENCES users(id)
);

CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    seat_id INT REFERENCES seats(id),
    reservation_date TIMESTAMP DEFAULT NOW()
);
DO $$
BEGIN
    FOR row_number IN 1..12 LOOP
        IF row_number < 12 THEN
            FOR seat_number IN 1..7 LOOP
                INSERT INTO seats (row_number, seat_number) VALUES (row_number, seat_number);
            END LOOP;
        ELSE
            FOR seat_number IN 1..3 LOOP
                INSERT INTO seats (row_number, seat_number) VALUES (row_number, seat_number);
            END LOOP;
        END IF;
    END LOOP;
END $$;

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    seat_id INT REFERENCES seats(id) ON DELETE CASCADE,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
