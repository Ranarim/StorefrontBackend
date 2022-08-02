/* Replace with your SQL commands */

CREATE TABLE orderProduct (
    id SERIAL PRIMARY KEY,
    quantity INT,
    orderId INT,
    productId INT,
    CONSTRAINT fkOrder FOREIGN KEY (orderId) REFERENCES orders(id),
    CONSTRAINT fkProduct FOREIGN KEY (productId) REFERENCES products(id)  
);

INSERT INTO orderProduct (quantity, orderId, productId) VALUES (5,1,1);


