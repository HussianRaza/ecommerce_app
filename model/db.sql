--create user table
CREATE TABLE users(
    id serial PRIMARY KEY,
    user_email text,
    user_password varchar(100)
);

--create address table
CREATE TABLE address(
    id serial PRIMARY KEY,
    user_id integer REFERENCES users(id),
    address text,
    postal_code integer,
);

--create products table
CREATE TABLE products(
    id serial PRIMARY KEY,
    name varchar(20),
    description text
);

--create cart table
CREATE TABLE cart(
    id serial PRIMARY KEY,
    user_id integer UNIQUE REFERENCES users(id)
);

--create orders table
CREATE TABLE orders(
    id serial PRIMARY KEY,
    cart_id integer UNIQUE REFERENCES cart(id),
    address_id integer UNIQUE REFERENCES address(id)
);

--create cart_products table
CREATE TABLE cart_products(
    cart_id integer UNIQUE REFERENCES cart(id),
    product_id integer UNIQUE REFERENCES products(id),
    product_qty integer,
    PRIMARY KEY(cart_id, product_id)
);

--update table to have salt hash
ALTER TABLE
    users
ADD
    COLUMN salt bytea;