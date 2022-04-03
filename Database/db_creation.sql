CREATE DATABASE la_suprema;
USE la_suprema;

CREATE TABLE users(
	user_id					INT NOT NULL AUTO_INCREMENT,
    email					VARCHAR(255) NOT NULL,
    password				VARCHAR(30) NOT NULL,
    username				VARCHAR(30) NOT NULL,
    created_at				TIMESTAMP DEFAULT NOW(),
    active					BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (user_id)
);

INSERT INTO users(email, password, username)
VALUES('example@domain.com', '123', 'Prz-Ellam');

CREATE TABLE products(
	product_id				INT NOT NULL AUTO_INCREMENT,
    name					VARCHAR(60) NOT NULL,
    price					DECIMAL NOT NULL,
    discount				DECIMAL NOT NULL,
    image					VARCHAR(255) NOT NULL,
    created_at				TIMESTAMP DEFAULT NOW(),
    active					BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (product_id)
);

CREATE TABLE categories(
	category_id				INT NOT NULL AUTO_INCREMENT,
    name					VARCHAR(60) NOT NULL,
    created_at          	TIMESTAMP DEFAULT NOW(),
    active					BOOLEAN DEFAULT TRUE
    
    
);

CREATE TABLE orders(
	order_id				INT NOT NULL AUTO_INCREMENT,
	created_at          	TIMESTAMP DEFAULT NOW(),
    active					BOOLEAN DEFAULT TRUE
);

CREATE TABLE cart_items(
	cart_item_id			INT NOT NULL AUTO_INCREMENT,
    product_id				INT NOT NULL,
	session_id				INT NOT NULL,
    quantity				INT NOT NULL,
    created_at          	TIMESTAMP DEFAULT NOW(),
    active					BOOLEAN DEFAULT TRUE
);

SELECT * FROM users;