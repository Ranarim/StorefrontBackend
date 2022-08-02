/* Replace with your SQL commands */

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    userId INT,
    status VARCHAR(50),
    CONSTRAINT fkUser FOREIGN KEY(userId) REFERENCES users(id)
);

INSERT INTO orders (userId, status) VALUES (1,'registered');



