## API Endpoints

#### USERS

- GET REQUEST index ("/users") => <ins>token required</ins>
- GET REQUEST show ("/users/:id") => <ins>token required</ins>
- POST REQUEST create ("/users") => <ins>token required</ins>

#### PRODUCTS

- GET REQUEST index ("/products")
- GET REQUEST show ("/products/:id")
- POST REQUEST create ("/products") => <ins>token required</ins>

#### ORDERS

- GET REQUEST index ("/orders") => <ins>token required</ins>
- GET REQUEST showOrdersByUser ("/products/:userId") => <ins>token required</ins>
- GET REQUEST showProductsByOrderId ("/orders/products/:id") => <ins>token required</ins>
- POST REQUEST create ("/orders") => <ins>token required</ins>
- POST REQUEST addProductToOrder ("/orders/products") => <ins>token required</ins>

## Data Scheme

#### USERS

- id SERIAL PRIMARY KEY,
- firstName VARCHAR(50),
- lastName VARCHAR(50),
- email VARCHAR(50),
- pw VARCHAR

#### PRODUCTS

- id SERIAL PRIMARY KEY,
- name VARCHAR(50),
- price integer

#### ORDERS

- id SERIAL PRIMARY KEY,
- userId INT,
- status VARCHAR(50),
- CONSTRAINT fkUser FOREIGN KEY(userId) REFERENCES users(id)

#### ORDERPRODUCT

- id SERIAL PRIMARY KEY,
- quantity INT,
- orderId INT,
- productId INT,
- CONSTRAINT fkOrder FOREIGN KEY (orderId) REFERENCES orders(id),
- CONSTRAINT fkProduct FOREIGN KEY (productId) REFERENCES products(id)
