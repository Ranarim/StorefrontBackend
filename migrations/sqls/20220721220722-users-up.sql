/* Replace with your SQL commands */

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    pw VARCHAR
    );

INSERT INTO users (firstname, lastname, pw)
VALUES
 ('Johannes', 'Maier', 'geheim');
