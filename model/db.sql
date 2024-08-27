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

--create trigger to auto add an cart id when a user is created
CREATE FUNCTION insert_into_cart() RETURNS TRIGGER AS $ $ BEGIN
INSERT INTO
    cart (user_id)
VALUES
    (NEW.id);

RETURN NULL;

END;

$ $ LANGUAGE plpgsql;

CREATE TRIGGER create_user_cart
AFTER
INSERT
    ON users FOR EACH ROW EXECUTE FUNCTION insert_into_cart();

--add a table named order_products
CREATE TABLE orders_products order_id int REFERENCES orders(id),
product_id int REFERENCES products(id),
product_qty int,
PRIMARY KEY (order_id, product_id);

--final fixed implementation
CREATE FUNCTION copy_into_orders_products() RETURNS TRIGGER AS $ $ BEGIN
INSERT INTO
    orders_products (order_id, product_id, product_qty)
SELECT
    orders.id AS order_id,
    cart_products.product_id,
    cart_products.product_qty
FROM
    cart_products,
    orders
WHERE
    cart_id = (
        SELECT
            id
        FROM
            cart
        WHERE
            user_id = NEW.user_id
    )
    AND orders.id = NEW.id;

DELETE FROM
    cart_products
WHERE
    cart_id = (
        SELECT
            id
        FROM
            cart
        WHERE
            user_id = NEW.user_id
    );

RETURN NULL;

END;

$ $ LANGUAGE plpgsql;

--added price and img columns in the database

alter table products
add column price int ,
add column img varchar(255)
;