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

DROP TABLE products;
CREATE TABLE products(
	product_id				INT NOT NULL AUTO_INCREMENT,
    name					VARCHAR(60) NOT NULL,
    price					DECIMAL(10,2) NOT NULL,
    discount				DECIMAL,
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
SELECT * FROM products;




CALL sp_GetProducts();

INSERT INTO products(name, price, image)
VALUES('Fresas con crema', 297.50, 'IMG001.jpg');

INSERT INTO products(name, price, image)
VALUES('Tres leches combinado', 340.00, 'E001S000032.jpg');

INSERT INTO products(name, price, image)
VALUES('Tentación de frutas', 250.50, 'E001S011649.jpg');

INSERT INTO products(name, price, image)
VALUES('Bambino tentación de fresas', 300.00, 'E001S007866.jpg');



USE `la_suprema`;
DROP procedure IF EXISTS `sp_GetProducts`;

DELIMITER $$
USE `la_suprema`$$
CREATE PROCEDURE `sp_GetProducts` ()
BEGIN

SELECT name, price, image
FROM products
WHERE active = TRUE;

END$$

DELIMITER ;










