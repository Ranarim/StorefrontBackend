/* Replace with your SQL commands */

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(50),
    pw VARCHAR
    );

INSERT INTO users (firstname, lastname, email, pw)
VALUES
 ('Johannes', 'Maier', 'johannes.maier@gmail.com','geheim');
