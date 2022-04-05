CREATE DATABASE la_suprema;
USE la_suprema;

DROP TABLE IF EXISTS users;

CREATE TABLE users(
	user_id					INT NOT NULL AUTO_INCREMENT,
    email					VARCHAR(255) UNIQUE NOT NULL,
    password				VARCHAR(200) NOT NULL,
    username				VARCHAR(18) UNIQUE NOT NULL,
    created_at			    TIMESTAMP DEFAULT NOW(),
    modified_at             TIMESTAMP,
    active					BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS products;

CREATE TABLE products(
	product_id				INT NOT NULL AUTO_INCREMENT,
    name					VARCHAR(60) NOT NULL,
    price					DECIMAL(10, 2) NOT NULL,
    discount				DECIMAL(10, 2),
    image					VARCHAR(255) NOT NULL,
    created_at				TIMESTAMP DEFAULT NOW(),
	modified_at             TIMESTAMP,
    active					BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (product_id)
);

DROP TABLE IF EXISTS categories;

CREATE TABLE categories(
	category_id				INT NOT NULL AUTO_INCREMENT,
    name					VARCHAR(60) NOT NULL,
    created_at          	TIMESTAMP DEFAULT NOW(),
	modified_at             TIMESTAMP,
    active					BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (category_id)
);

DROP TABLE IF EXISTS orders;

CREATE TABLE orders(
	order_id				INT NOT NULL AUTO_INCREMENT,
    user_id					INT NOT NULL,
	created_at          	TIMESTAMP DEFAULT NOW(),
    modified_at             TIMESTAMP,
    active					BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (order_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

DROP TABLE IF EXISTS shoppings;

CREATE TABLE shoppings(
	shopping_id				INT NOT NULL AUTO_INCREMENT,
    order_id				INT NOT NULL,
    product_id				INT NOT NULL,
    quantity				INT NOT NULL,
    amount					DECIMAL(10, 2),
    created_at          	TIMESTAMP DEFAULT NOW(),
    modified_at             TIMESTAMP,
    active					BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (shopping_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)

);

SELECT * FROM orders;
SELECT * FROM products;
SELECT * FROM shoppings;

INSERT INTO orders(user_id)
VALUES(1);

INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(1, 4, 2, 600.00);
INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(1, 8, 1, 360.00);
INSERT INTO shoppings(order_id, product_id, quantity, amount)
VALUES(1, 3, 4, 1000.00);



-- Este query sirve para obtener la cantidad de ventas que han tenido todos los pasteles ordenados del mas
-- vendido al menos vendido
SELECT products.name, IFNULL(COUNT(shoppings.product_id) * shoppings.quantity, 0) AS Cantidad FROM products
LEFT JOIN shoppings
ON products.product_id = shoppings.product_id
GROUP BY  products.name
ORDER BY Cantidad DESC;
















CREATE TABLE shopping_sessions(
	session_id				INT NOT NULL AUTO_INCREMENT,
    user_id					INT NOT NULL,
    total					DECIMAL(6, 2) NOT NULL,
    created_at          	TIMESTAMP DEFAULT NOW(),
	modified_at             TIMESTAMP,
    
    PRIMARY KEY (session_id)
);

CREATE TABLE orders(
	order_id				INT NOT NULL AUTO_INCREMENT,
    shopping_session_id     INT NOT NULL,
	created_at          	TIMESTAMP DEFAULT NOW(),
    modified_at             TIMESTAMP,
    active					BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (order_id)
);

CREATE TABLE cart_items(
	cart_item_id			INT NOT NULL AUTO_INCREMENT,
    product_id				INT NOT NULL,
	session_id				INT NOT NULL,
    quantity				INT NOT NULL,
    created_at          	TIMESTAMP DEFAULT NOW(),
    modified_at             TIMESTAMP,
    active					BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (cart_item_id)
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

INSERT INTO products(name, price, image)
VALUES('Pastel Zebra', 339.00, 'E001S000431.jpg');

INSERT INTO products(name, price, image)
VALUES('Pastel Cubano', 305.00, 'E001S000026.jpg');

INSERT INTO products(name, price, image)
VALUES('Pastel Combinado', 238.00, 'E001S000033.jpg');

INSERT INTO products(name, price, image)
VALUES('Pastel Bombon', 360.00, 'E001S001626.jpg');
















USE `la_suprema`;
DROP procedure IF EXISTS `sp_GetProducts`;

DELIMITER $$
USE `la_suprema`$$
CREATE PROCEDURE `sp_GetProducts` ()
BEGIN

SELECT product_id, name, price, image
FROM products
WHERE active = TRUE
ORDER BY created_at DESC, product_id DESC;

END$$

DELIMITER ;






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





USE `la_suprema`;
DROP procedure IF EXISTS `sp_GetSellersProducts`;

DELIMITER $$
USE `la_suprema`$$
CREATE PROCEDURE `sp_GetSellersProducts` ()
BEGIN

SELECT products.name, products.price, products.image, IFNULL(COUNT(shoppings.product_id) * shoppings.quantity, 0) AS Cantidad FROM products
LEFT JOIN shoppings
ON products.product_id = shoppings.product_id
GROUP BY  products.name
ORDER BY IFNULL(COUNT(shoppings.product_id) * shoppings.quantity, 0) DESC;

END$$

DELIMITER ;


CALL sp_GetSellersProducts();









